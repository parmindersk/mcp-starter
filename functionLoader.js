const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv();

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
    const schema = meta.schema || {};

    const validateFn =
      Object.keys(schema).length > 0 ? ajv.compile(schema) : null;

    functions[name] = {
      handler,
      meta,
      validate: validateFn,
    };

    manifestEntries[name] = {
      name,
      description: meta.description || `Function ${name}`,
      parameters: schema,
    };
  });

  return { functions, manifestEntries };
}

module.exports = loadFunctions;
