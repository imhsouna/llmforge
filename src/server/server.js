const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// A simple GET route for health check
app.get('/', (req, res) => {
  res.send('LLMForge Server Running');
});

app.listen(port, () => {
  console.log(`LLMForge server is listening on port ${port}`);
});
