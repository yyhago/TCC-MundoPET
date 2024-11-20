// Importando o pacote mongoose para facilitar a interação com o MongoDB
const mongoose = require('mongoose');

// Definindo a string de conexão com o MongoDB, contendo a URL de conexão do MongoDB Atlas.
// A URI inclui as credenciais, o nome do banco de dados e outras configurações de conexão.
const URI = 'mongodb+srv://yyhago:Tele9815@mundopettcc.bxuhl.mongodb.net/?retryWrites=true&w=majority&appName=mundopetTCC';

// Exibindo a URI de conexão no console
console.log('URI:', URI);

// Ativando o modo de depuração do Mongoose, para exibir no console todas as queries que são executadas no banco.
mongoose.set('debug', true);

// Função assíncrona para estabelecer a conexão com o banco de dados MongoDB
const connectDB = async () => {
  try {
    // Tentando conectar ao banco de dados usando a URI fornecida.
    // O mongoose.connect() retorna uma Promise, por isso é usado await para aguardar a conclusão da operação.
    await mongoose.connect(URI);

    // Se a conexão for bem-sucedida, exibimos uma mensagem indicando que a conexão foi estabelecida com sucesso.
    console.log('Conectado ao DB - MongoDB Atlas');
  } catch (err) {
    // Caso ocorra algum erro durante a conexão, ele será capturado e exibido no console.
    console.error(err);
  }
};

// Chamando a função para tentar estabelecer a conexão com o banco de dados.
connectDB();
