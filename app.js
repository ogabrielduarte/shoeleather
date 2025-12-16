const express = require('express');
const routes = require('./routes/routes');
const { sequelize } = require('sequelize');

const app = express();
app.use(express.json());

// rotas
app.use('/api', routes);

// conexão banco
sequelize.sync()
  .then(() => console.log('Banco sincronizado'))
  .catch(err => console.error(err));

module.exports = app;
