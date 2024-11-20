// Importando as funções necessárias do módulo 'paypal', que presumivelmente implementa a lógica para criação de transações e verificação de status de pagamento.
const { createSplitTransaction, getPayoutStatus } = require('./paypal');

// Array que contém os detalhes de cada pagamento a ser realizado para diferentes destinatários.
// Cada pagamento tem informações sobre o e-mail do destinatário, nome e o valor a ser pago.
const payments = [
    {
        recipientEmail: 'sb-zo4347633134668@business.example.com', // E-mail do destinatário
        recipientName: 'Petshop A', // Nome do destinatário
        amount: '20.00' // Valor a ser pago
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

// Chamando a função 'createSplitTransaction', passando o array de pagamentos para dividir a transação entre os destinatários.
createSplitTransaction(payments)
    .then(result => {
        // Verificando o resultado da criação da transação. Caso haja um erro, ele será mostrado no console.
        if (result.error) {
            console.error('Erro na transação:', result.message);
        } else {
            // Caso a transação seja bem-sucedida, exibe os dados da transação completa.
            console.log('Transação completa:', result.data);

            // Após a transação ser concluída, chama a função 'getPayoutStatus' para verificar o status do pagamento,
            // utilizando o 'batch_id' retornado pela transação para monitorar o pagamento.
            return getPayoutStatus(result.data.batch_id);
        }
    })
    .then(statusResult => {
        // Verificando se o status do payout foi retornado com sucesso.
        // Caso o status não contenha erros, ele será exibido no console.
        if (statusResult && !statusResult.error) {
            console.log('Status do payout:', statusResult.data);
        }
    })
    .catch(err => {
        // Caso ocorra qualquer erro durante o processo de transação ou verificação do status, o erro será capturado e exibido no console.
        console.error('Erro ao processar a transação:', err);
    });
