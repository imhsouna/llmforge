// src/server/server.js

const express = require('express');
const { getSuggestedCodeChange } = require('../llm_interface/mock_llm');
const { stageCodeChange, approveChange } = require('../approval_workflow/staging');

const app = express();
app.use(express.json()); // parse JSON request bodies

const port = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => {
  res.send('LLMForge Server Running');
});

// POST /propose { "description": "Add a user route" }
app.post('/propose', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  const proposal = getSuggestedCodeChange(description);
  const id = stageCodeChange(proposal);
  return res.json({ id, proposal });
});

// POST /approve/:id
app.post('/approve/:id', (req, res) => {
  const { id } = req.params;
  const success = approveChange(parseInt(id, 10));
  if (success) {
    return res.json({ message: `Change #${id} approved` });
  } else {
    return res.status(404).json({ error: 'No such staged change' });
  }
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`LLMForge server is listening on port ${port}`);
  });
}

module.exports = app; // Export the app for testing
