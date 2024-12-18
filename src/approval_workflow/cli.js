// In the future, this script could be run by the developer to stage/approve code changes.
// For now, it's just a placeholder.

const { stageCodeChange, listStagedChanges, approveChange } = require('./staging');

function demo() {
  const proposalId = stageCodeChange({ description: "Add a new feature route", codeSnippet: "app.get('/feature', ...)" });
  console.log("Staged changes:", listStagedChanges());
  
  // Approve the change (in reality we'd integrate the code)
  approveChange(proposalId);
}

demo();
