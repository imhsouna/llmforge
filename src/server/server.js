const express = require('express');
const fs = require('fs');
const path = require('path');
const { getSuggestedCodeChange } = require('../llm_interface/mock_llm');
const { stageCodeChange, approveChange } = require('../approval_workflow/staging');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Dynamically load all generated routes
const generatedRoutesDir = path.join(__dirname, 'routes', 'generated');
if (fs.existsSync(generatedRoutesDir)) {
  const routeFiles = fs.readdirSync(generatedRoutesDir).filter(file => file.endsWith('.js'));
  for (const file of routeFiles) {
    const routeModule = require(path.join(generatedRoutesDir, file));
    // routeModule is a function that takes (app) and registers the route
    routeModule(app);
  }
}

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
    return res.json({ message: `Change #${id} approved. Restart the server to load the new route.` });
  } else {
    return res.status(404).json({ error: 'No such staged change' });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`LLMForge server is listening on port ${port}`);
  });
}

module.exports = app;
