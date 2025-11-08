const request = require('supertest');
const app = require('../../server'); 

describe('Products API', () => {
  it('should retrieve all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0); 
  });

  it('should create a new product', async () => {
    const newProduct = {
      productName: 'New Bag',
      price: 39.99,
      description: 'A new stylish bag.',
      category: 'Accessories'
    };

    const res = await request(app)
      .post('/products')
      .send(newProduct);

    expect(res.statusCode).toEqual(201);
    expect(res.body.productName).toEqual(newProduct.productName);
    expect(res.body.price).toEqual(newProduct.price);
    expect(res.body.description).toEqual(newProduct.description);
    expect(res.body.category).toEqual(newProduct.category);
  });

  it('should retrieve a product by ID', async () => {
    const res = await request(app).get('/products/1'); 
    expect(res.statusCode).toEqual(200);
    expect(res.body.productName).toEqual('Bag'); 
  });

  it('should return 404 for a non-existing product', async () => {
    const res = await request(app).get('/products/999'); 
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Product not found'); 
  });

  it('should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/products')
      .send({}); 
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('All fields are required'); 
  });
});