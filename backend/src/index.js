const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

//aplicaçoes abilitadas
app.use(cors());

// fala para o express que as respostas serão sempre retornadas em JSON.
app.use(express.json());
// usa as rotas do arquivo de rotas.
app.use(routes);

app.listen(3333);
