// This module will handle the staging of code proposals.
// For now, it just stores code proposals in memory.

const stagedChanges = [];

function stageCodeChange(proposal) {
  // proposal is an object with { description, codeSnippet }
  stagedChanges.push(proposal);
  return stagedChanges.length - 1; // return the index as an ID
}

function listStagedChanges() {
  return stagedChanges;
}

function approveChange(id) {
  // In future, this will integrate the change into the codebase.
  // For now, let's just log that we're approving it.
  if (stagedChanges[id]) {
    console.log(`Approving change #${id}:`, stagedChanges[id]);
    // Here we would merge code into the server or other parts of the project.
    return true;
  }
  return false;
}

module.exports = { stageCodeChange, listStagedChanges, approveChange };
