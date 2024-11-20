const axios = require("axios");
const { clientId, secret } = require("../data/keys");

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

// Função para obter o token de acesso
const getAccessToken = async () => {
  try {
    console.log("Obtendo token de acesso do PayPal...");
    const response = await axios({
      method: "post",
      url: `${PAYPAL_API}/v1/oauth2/token`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString(
          "base64"
        )}`,
      },
      data: "grant_type=client_credentials",
    });
    console.log("✅ Token obtido com sucesso");
    return response.data.access_token;
  } catch (error) {
    console.error(
      "❌ Erro ao obter token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Função simplificada para criar recipient

const createRecipient = async (receiverEmail, businessName) => {
  try {
    console.log(`\nCriando recipient para ${businessName}`);

    const token = await getAccessToken();

    const response = await axios({
      method: "post",

      url: `${PAYPAL_API}/v1/payments/payouts`,

      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },

      data: {
        sender_batch_header: {
          sender_batch_id: `Batch_${Date.now()}_${businessName.replace(
            /\s+/g,
            ""
          )}`,

          email_subject: "Cadastro realizado com sucesso!",

          email_message: `Bem-vindo ao MundoPet! Seu cadastro para ${businessName} foi realizado com sucesso.`,
        },

        items: [
          {
            recipient_type: "EMAIL",

            amount: {
              value: "0.00",

              currency: "BRL",
            },

            note: `Registro para: ${businessName}`,

            sender_item_id: `Register_${Date.now()}`,

            receiver: receiverEmail,
          },
        ],
      },
    });

    console.log("✅ Recipient criado com sucesso"); // Retornando um ID único baseado no batch_id

    return {
      error: false,

      data: {
        id: response.data.batch_header.payout_batch_id,

        batch_status: response.data.batch_header.batch_status,
      },
    };
  } catch (error) {
    console.error(
      "❌ Erro ao criar recipient:",
      error.response?.data || error.message
    );

    return {
      error: true,

      message: error.response?.data?.message || error.message,

      details: error.response?.data,
    };
  }
};

// Função para criar uma transação split melhorada
const createSplitTransaction = async (payments) => {
  try {
    console.log("Iniciando transação split...");

    if (!Array.isArray(payments) || payments.length === 0) {
      throw new Error("Payments deve ser um array não vazio");
    }

    // Validação dos campos necessários
    payments.forEach((payment, index) => {
      if (
        !payment.recipientEmail ||
        !payment.amount ||
        !payment.recipientName
      ) {
        throw new Error(
          `Pagamento ${index + 1} está faltando campos obrigatórios`
        );
      }
      if (
        isNaN(parseFloat(payment.amount)) ||
        parseFloat(payment.amount) <= 0
      ) {
        throw new Error(`Valor inválido para o pagamento ${index + 1}`);
      }
    });

    // Calcula o total da transação para a taxa administrativa
    const totalAmount = payments.reduce(
      (acc, payment) => acc + parseFloat(payment.amount),
      0
    );
    const adminShare = (totalAmount * 0.1).toFixed(2); // 10% para administração
    const adminEmail = "sb-qucx433316704@personal.example.com"; // Email do administrador

    // Cria os items de pagamento incluindo petshops e administrador
    const payoutItems = [
      ...payments.map((payment, index) => ({
        recipient_type: "EMAIL",
        amount: {
          value: parseFloat(payment.amount).toFixed(2),
          currency: "BRL",
        },
        note: `Pagamento para ${payment.recipientName}`,
        sender_item_id: `payment_${Date.now()}_${index}`,
        receiver: payment.recipientEmail,
      })),
      {
        recipient_type: "EMAIL",
        amount: {
          value: adminShare,
          currency: "BRL",
        },
        note: "Taxa administrativa MundoPet",
        sender_item_id: `admin_fee_${Date.now()}`,
        receiver: adminEmail,
      },
    ];

    const token = await getAccessToken();

    const response = await axios({
      method: "post",
      url: `${PAYPAL_API}/v1/payments/payouts`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        sender_batch_header: {
          sender_batch_id: `Batch_${Date.now()}`,
          email_subject: "Pagamento recebido via MundoPet",
          email_message:
            "Você recebeu um pagamento através da plataforma MundoPet.",
        },
        items: payoutItems,
      },
    });

    console.log("✅ Transação split realizada com sucesso");
    return {
      error: false,
      data: {
        batch_id: response.data.batch_header.payout_batch_id,
        batch_status: response.data.batch_header.batch_status,
        items: response.data.items,
      },
    };
  } catch (error) {
    console.error(
      "❌ Erro ao realizar transação split:",
      error.response?.data || error.message
    );
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
    };
  }
};

// Função para verificar o status de um payout específico
const getPayoutStatus = async (batchId) => {
  try {
    if (!batchId) {
      throw new Error("BatchId é obrigatório");
    }

    const token = await getAccessToken();
    const response = await axios({
      method: "get",
      url: `${PAYPAL_API}/v1/payments/payouts/${batchId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
    };
  }
};

module.exports = {
  createRecipient,
  createSplitTransaction,
  getPayoutStatus,
};
