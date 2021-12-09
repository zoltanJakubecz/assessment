const express = require('express');
const app = express();
const todosRoute = require('./routes/todosRoute');

app.use(express.json({ type: 'application/json'}));
app.use('/todos', todosRoute);

module.exports = app;