require("dotenv").config();
const express = require("express");
const verifyToken = require("./verifyToken");
const loadFunctions = require("./functionLoader");
const { functions, manifestEntries } = loadFunctions();
const logger = require("./utils/logger");
const projectMeta = require("./projectMeta.json");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET not set in .env");
  process.exit(1);
}

app.use(express.json());

app.get("/mcp-manifest.json", (req, res) => {
  res.json({
    schema_version: "1.0",
    name: projectMeta.name,
    description: projectMeta.description,
    authentication: {
      type: "bearer",
      instructions: "Use a tenant-issued JWT in the Authorization header",
    },
    functions: manifestEntries,
  });
});

app.post("/mcp", async (req, res) => {
  const { method, params = {} } = req.body;

  if (!method || typeof method !== "string") {
    return res.status(400).json({ error: "Missing or invalid method name" });
  }

  try {
    const token = req.headers.authorization;
    const claims = verifyToken(token, JWT_SECRET);
    const tenantId = claims.tenant_id;

    const fnEntry = functions[method];
    if (!fnEntry) {
      return res.status(404).json({ error: `Function '${method}' not found` });
    }

    // Validate input params using JSON schema
    if (fnEntry.validate && !fnEntry.validate(params)) {
      return res.status(400).json({
        error: "Schema validation failed",
        details: fnEntry.validate.errors,
      });
    }

    const result = await fnEntry.handler({ ...params, tenantId });
    logger.info(`${method} executed for tenant ${tenantId}`);
    res.json({ result });
  } catch (err) {
    logger.error(`${method || "unknown"} failed: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
});

app.get("/mcp", (req, res) => {
  res.json(projectMeta);
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`MCP Starter listening on http://localhost:${PORT}/mcp`);
});
