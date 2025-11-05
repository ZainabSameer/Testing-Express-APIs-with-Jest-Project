const express = require('express');
const productsRouter = require('./src/routers/products.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productsRouter); 

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}