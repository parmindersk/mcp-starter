const fs = require("fs");
const path = require("path");

function loadFunctions() {
  const functionsDir = path.join(__dirname, "functions");
  const files = fs.readdirSync(functionsDir);

  const functions = {};
  const manifestEntries = {};

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;

    const name = file.replace(".js", "");
    const handler = require(path.join(functionsDir, file));
    const meta = handler.meta || {};

    functions[name] = {
      handler,
      meta,
    };

    manifestEntries[name] = {
      name,
      description: meta.description || `Function ${name}`,
      parameters: meta.inputSchema || {},
    };
  });

  return { functions, manifestEntries };
}

module.exports = loadFunctions;
