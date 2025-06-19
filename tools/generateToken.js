const jwt = require("jsonwebtoken");

const args = process.argv.slice(2);
const tenantArg = args.find((arg) => arg.startsWith("--tenant="));
const secretArg = args.find((arg) => arg.startsWith("--secret="));
const scopesArg = args.find((arg) => arg.startsWith("--scopes="));

if (!tenantArg || !secretArg) {
  console.error(
    "Usage: node tools/generateToken.js --tenant=acme --secret=your_secret [--scopes=scope1,scope2]"
  );
  process.exit(1);
}

const tenantId = tenantArg.split("=")[1];
const secret = secretArg.split("=")[1];
const scopes = scopesArg ? scopesArg.split("=")[1].split(",") : [];

const token = jwt.sign(
  {
    tenant_id: tenantId,
    scopes,
  },
  secret,
  { expiresIn: "1h" }
);

console.log("\nYour JWT:\n");
console.log(token);
console.log("\nUse it in your Authorization header:");
console.log(`Authorization: Bearer ${token}\n`);
