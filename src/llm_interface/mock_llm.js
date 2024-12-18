// src/llm_interface/mock_llm.js

function getSuggestedCodeChange(requestDescription) {
    // Generate a code snippet that matches the requested description.
    // For example, "Add a user route" becomes a route '/add-a-user-route'.
    const routeName = requestDescription.toLowerCase().replace(/\s+/g, '-');
    const snippet = `// Proposed code for: ${requestDescription}
  app.get('/${routeName}', (req, res) => {
    res.send('This is the ${requestDescription} feature.');
  });`;
  
    return {
      description: requestDescription,
      codeSnippet: snippet
    };
  }
  
  module.exports = { getSuggestedCodeChange };
  