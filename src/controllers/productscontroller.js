let Products = [
  { id: 1, productName: 'Bag', price: 29.99, description: 'A stylish bag for everyday use.', category: 'Accessories' },
  { id: 2, productName: 'Shoes', price: 49.99, description: 'Comfortable running shoes.', category: 'Footwear' },
  { id: 3, productName: 'Watch', price: 99.99, description: 'A classic wristwatch.', category: 'Accessories' }
];


const getProducts = (req, res) => {
  res.status(200).json(Products); 
};


const createProduct = (req, res) => {
  const { productName, price, description, category } = req.body;

  
  if (!productName || !price || !description || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = { id: Products.length + 1, productName, price, description, category };
  Products.push(newProduct);
  res.status(201).json(newProduct); 
};



const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = Products.find((p) => p.id === id);
  if (product) {
    res.status(200).json(product); 
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById
};