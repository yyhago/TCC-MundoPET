const { createSplitTransaction } = require('./paypal');

// Array de pagamentos (recipients)
const payments = [
    {
        recipientEmail: 'sb-owwkz26611905@business.example.com',
        recipientName: 'Petshop A',
        amount: '100.00'
    },
    {
        recipientEmail: 'sb-5nw6n26611614@business.example.com',
        recipientName: 'Petshop B',
        amount: '150.00'
    }
];


createSplitTransaction(payments).then(result => {
    if (result.error) {
        console.error('Erro na transação:', result.message);
    } else {
        console.log('Transação completa:', result.data);
    }
});
