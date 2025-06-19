const jwt = require("jsonwebtoken");

function verifyToken(authHeader, secret) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded.tenant_id) {
      throw new Error("Token must include tenant_id");
    }
    return decoded;
  } catch (err) {
    throw new Error("Invalid token: " + err.message);
  }
}

module.exports = verifyToken;
