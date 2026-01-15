const jwt = require("jsonwebtoken");

// Create JWT with full payload (id + role)
const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = createToken;
