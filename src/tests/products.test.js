const request = require('supertest');
const app = require('../app');

describe('Products API', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/products')
      .send({ productName: 'Test Product', price: 20.99, description: 'A test product', category: 'Test' });
  });

  it('should retrieve all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array); 
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ productName: 'New Product', price: 10.99, description: 'A new product', category: 'Test' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.productName).toEqual('New Product');
  });

  it('should retrieve a product by ID', async () => {
    const createRes = await request(app)
      .post('/api/products')
      .send({ productName: 'Product 1', price: 19.99, description: 'First product', category: 'Test' });

    const res = await request(app).get(`/api/products/${createRes.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.productName).toEqual('Product 1');
  });

  it('should return 404 for a non-existing product', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.statusCode).toEqual(404);
  });
});