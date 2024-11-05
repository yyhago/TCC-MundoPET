const axios = require('axios');
const { clientId, secret } = require('../data/keys');

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';




// Função para obter o token de acesso
const getAccessToken = async () => {
    try {
        console.log('Obtendo token de acesso do PayPal...');
        const response = await axios({
            method: 'post',
            url: `${PAYPAL_API}/v1/oauth2/token`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`
            },
            data: 'grant_type=client_credentials'
        });
        console.log('✅ Token obtido com sucesso');
        return response.data.access_token;
    } catch (error) {
        console.error('❌ Erro ao obter token:', error.response?.data || error.message);
        throw error;
    }
};




// Função simplificada para criar recipient
const createRecipient = async (receiverEmail, businessName) => {
    try {
        console.log(`\nCriando recipient para ${businessName}`);
        const token = await getAccessToken();
        
        
        const response = await axios({
            method: 'post',
            url: `${PAYPAL_API}/v1/payments/payouts`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                sender_batch_header: {
                    sender_batch_id: `Batch_${Date.now()}_${businessName.replace(/\s+/g, '')}`,
                    email_subject: "Cadastro realizado com sucesso!",
                    email_message: `Bem-vindo ao MundoPet! Seu cadastro como empresa para ${businessName} foi realizado com sucesso.`
                },
                items: [{
                    recipient_type: "EMAIL",
                    amount: {
                        value: "20.00",
                        currency: "BRL"
                    },
                    note: `Registro para: ${businessName}`,
                    sender_item_id: `Register_${Date.now()}`,
                    receiver: receiverEmail
                }]
            }
        });

        console.log('✅ Recipient criado com sucesso');
        
        // Retornando um ID único baseado no batch_id
        return {
            error: false,
            data: {
                id: response.data.batch_header.payout_batch_id,
                batch_status: response.data.batch_header.batch_status
            }
        };
    } catch (error) {
        console.error('❌ Erro ao criar recipient:', error.response?.data || error.message);
        return {
            error: true,
            message: error.response?.data?.message || error.message,
            details: error.response?.data
        };
    }
};



// Função que cria a transação split (pagamento dividido)
const createSplitTransaction = async (payments) => {
    try {
        console.log('Iniciando transação split...');
        const token = await getAccessToken();

        const payoutItems = payments.map((payment, index) => ({
            recipient_type: "EMAIL",
            amount: {
                value: payment.amount, // Valor para cada destinatário
                currency: "BRL"        // Moeda
            },
            note: `Pagamento para ${payment.recipientName}`,  // Nota opcional para o destinatário
            sender_item_id: `Item_${index}`,  // Um ID único para cada item
            receiver: payment.recipientEmail // Email do destinatário (recipient)
        }));

        const response = await axios({
            method: 'post',
            url: `${PAYPAL_API}/v1/payments/payouts`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                sender_batch_header: {
                    sender_batch_id: `Batch_${Date.now()}`,  // ID único da transação
                    email_subject: "Você recebeu um pagamento!",  // Assunto do email enviado pelo PayPal
                    email_message: "Foi enviado um pagamento para você." // Mensagem enviada no email
                },
                items: payoutItems // Array de itens (cada destinatário recebe um valor)
            }
        });

        console.log('✅ Transação split realizada com sucesso');
        return {
            error: false,
            data: response.data
        };
    } catch (error) {
        console.error('❌ Erro ao realizar transação split:', error.response?.data || error.message);
        return {
            error: true,
            message: error.response?.data?.message || error.message
        };
    }
};




module.exports = {
    createRecipient,
    createSplitTransaction
};