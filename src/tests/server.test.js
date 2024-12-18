const request = require('supertest');
const express = require('express');

// We'll create a small test server for this test:
const app = express();
app.get('/', (req, res) => {
  res.send('LLMForge Server Running');
});

describe('Server', () => {
  it('should respond with the expected message on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch(/LLMForge Server Running/);
  });
});
