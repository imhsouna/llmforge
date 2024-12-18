const fs = require('fs');
const path = require('path');

const stagedChanges = [];

/**
 * Stages a code change proposal.
 * @param {{description: string, codeSnippet: string}} proposal
 * @returns number - The index (ID) of the staged change.
 */
function stageCodeChange(proposal) {
  stagedChanges.push(proposal);
  return stagedChanges.length - 1;
}

function listStagedChanges() {
  return stagedChanges;
}

/**
 * Approves a change by its ID.
 * For now, this writes the code snippet to a file in `src/server/routes/generated/`.
 * On server restart, that file will be loaded as a route.
 *
 * @param {number} id
 * @returns boolean - True if successful, false if no such change.
 */
function approveChange(id) {
  const proposal = stagedChanges[id];
  if (!proposal) {
    return false;
  }

  console.log(`Approving change #${id}:`, proposal);

  // Write the proposed code snippet to a file
  const routesDir = path.join(__dirname, '..', 'server', 'routes', 'generated');
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
  }

  const filename = `route_${id}.js`;
  const filePath = path.join(routesDir, filename);

  // We'll wrap the snippet in a module export that attaches to `app`.
  // The snippet is assumed to be a route definition like app.get(...).
  // We'll define a function that takes `app` as a parameter and executes the snippet.
  // Example:
  // module.exports = (app) => {
  //   <insert codeSnippet here>
  // };

  const fileContent = `module.exports = (app) => {
${proposal.codeSnippet}
};`;

  fs.writeFileSync(filePath, fileContent, 'utf8');

  return true;
}

module.exports = { stageCodeChange, listStagedChanges, approveChange };
