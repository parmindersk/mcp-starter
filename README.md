# mcp-starter

**Secure, starter MCP server boilerplate with JWT authentication, schema validation, and Docker support.**

Built for developers who want to expose AI-compatible APIs to tools like Claude, OpenAI, Sourcegraph Cody, or custom agents using the [Model Context Protocol (MCP)](https://www.anthropic.com/index/model-context-protocol).

## Features

- JWT-based authentication with tenant isolation
- Function auto-loading from `/functions` directory
- Inline per-function schema validation (via [AJV](https://ajv.js.org/))
- Dynamic MCP manifest generation (`/mcp-manifest.json`)
- Docker container
- CLI utility to generate JWTs for local testing
- Health endpoints (`/mcp`, `/healthz`)

---

## Running locally

### Clone repo

```bash
git clone https://github.com/parmindersk/mcp-starter.git
cd mcp-starter
```

### Run with Docker

```bash
docker-compose up
```

### Run from code

```bash
pnpm install
pnpm start
```

### Generating a Test Token

```bash
node tools/generateToken.js --tenant=acme --secret=supersecure
```

The --secret value (_supersecure_) must match the JWT_SECRET defined in your .env or docker-compose.yml.

### Testing sample submitFeedback

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer YOUR_JWT_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "submitFeedback",
    "params": {
      "message": "Love the product!",
      "rating": 5
    }
  }'
```

You can play around with the body to remove message or give an invalid value for rating to see how validation is working.

_Follow [SinghSpeak.com](https://singhspeak.com) for more._

Have feedback or feature ideas? [Open an issue](https://github.com/parmindersk/mcp-starter/issues) or contribute via pull request.
