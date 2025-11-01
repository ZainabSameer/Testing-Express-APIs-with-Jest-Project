const express = require('express');
const productsRouter = require('./routers/products'); 

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter); 

module.exports = app;