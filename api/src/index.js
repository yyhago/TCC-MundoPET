require('dotenv').config();
// Importação de bibliotecas necessárias

const express = require('express'); // Framework para criar o servidor
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens
const morgan = require('morgan'); // Middleware para logging de requisições HTTP
const app = express(); // Criação da aplicação Express

// Importação da conexão com o banco de dados
require('./database');

// Configuração de porta (variável de ambiente ou valor padrão)
app.set('port', process.env.PORT || 8000); // Define a porta na qual o servidor vai rodar

// Middlewares
app.use(cors()); // Habilita o CORS para aceitar requisições de outras origens
app.use(morgan('dev')); // Configura o logging das requisições no terminal, em formato de desenvolvimento
app.use(express.json()); // Permite que a aplicação manipule JSON no corpo das requisições

// Rotas
app.use('/', require('./routes/main.routes')); // Configura as rotas principais

// Inicialização do servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta ${app.get('port')}`);
});
