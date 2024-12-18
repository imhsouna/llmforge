// src/tests/approval_flow.test.js

const request = require('supertest');
const app = require('../server/server');

describe('Approval Flow', () => {
  it('should propose a change', async () => {
    const response = await request(app)
      .post('/propose')
      .send({ description: 'Add a user route' });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.proposal).toBeDefined();
    expect(response.body.proposal.codeSnippet).toMatch(/Add a user route/);
  });

  it('should approve a staged change', async () => {
    // First propose a change to get an ID
    const proposeRes = await request(app)
      .post('/propose')
      .send({ description: 'Add a product route' });

    const changeId = proposeRes.body.id;
    const approveRes = await request(app)
      .post(`/approve/${changeId}`)
      .send();

    expect(approveRes.statusCode).toBe(200);
    expect(approveRes.body.message).toMatch(/approved/);
  });
});
