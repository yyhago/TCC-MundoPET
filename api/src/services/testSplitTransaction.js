const { createSplitTransaction } = require('./paypal');

// Array de pagamentos (recipients)
const payments = [
    {
        recipientEmail: 'sb-zo4347633134668@business.example.com',
        recipientName: 'Petshop A',
        amount: '20.00'
    },
    {
        recipientEmail: 'sb-tkbyr33134658@business.example.com',
        recipientName: 'Petshop B',
        amount: '150.00'
    },
    {
        recipientEmail: 'sb-jqm5a33134649@business.example.com',
        recipientName: 'Petshop C',
        amount: '10.00'
    },
    {
        recipientEmail: 'sb-owwkz26611905@business.example.com',
        recipientName: 'Petshop D',
        amount: '120.00'
    },
    {
        recipientEmail: 'sb-5nw6n26611614@business.example.com',
        recipientName: 'Petshop E',
        amount: '90.00'
    }
];


createSplitTransaction(payments).then(result => {
    if (result.error) {
        console.error('Erro na transação:', result.message);
    } else {
        console.log('Transação completa:', result.data);
    }
});
