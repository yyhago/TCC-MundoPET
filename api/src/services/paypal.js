const axios = require('axios');
const { clientId, secret } = require('../data/keys');

const api = axios.create({
    baseURL: 'https://api-m.sandbox.paypal.com/v1',
});

// Função para obter o token de acesso
const getAccessToken = async () => {
    const response = await axios({
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'pt_BR',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`
        },
        data: 'grant_type=client_credentials'
    });
    return response.data.access_token;
};

// Interceptor para adicionar o Authorization Bearer token nas requisições
api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

module.exports = { 
    createRecipient: async (receiverEmail, productName) => {
        try {
            const response = await api.post('/payments/payouts', {
                "sender_batch_header": {
                    "sender_batch_id": `Payouts_${Date.now()}`,
                    "email_subject": "Você recebeu um pagamento!",
                    "email_message": `Você recebeu um pagamento por ${productName} através do ADM MundoPet`
                },
                "items": [
                    {
                        "recipient_type": "EMAIL",
                        "amount": {
                            "value": "1.00", 
                            "currency": "BRL"
                        },
                        "note": `Obrigado por sua participação! Produto: ${productName}`,
                        "sender_item_id": `item_${Date.now()}`,
                        "receiver": receiverEmail
                    }
                ]
            });

            return { error: false, data: response.data };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}
