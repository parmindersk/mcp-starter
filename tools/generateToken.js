require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

const args = process.argv.slice(2);
const tenantArg = args.find((arg) => arg.startsWith("--tenant="));
const secretArg = args.find((arg) => arg.startsWith("--secret="));

if (!tenantArg) {
  console.error(
    "Usage: node tools/generateToken.js --tenant=acme --secret=your_secret [--scopes=scope1,scope2]"
  );
  process.exit(1);
}

const tenantId = tenantArg.split("=")[1];
const secret = process.env.JWT_SECRET || secretArg.split("=")[1];

const token = jwt.sign(
  {
    tenant_id: tenantId,
  },
  secret,
  { expiresIn: "1h" }
);

console.log("\nYour JWT:\n");
console.log(token);
console.log("\nUse it in your Authorization header:");
console.log(`Authorization: Bearer ${token}\n`);
