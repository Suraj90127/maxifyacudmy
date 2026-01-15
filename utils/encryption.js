// utils/encryption.js
const crypto = require("crypto");

// 32-byte key (MUST BE STATIC or stored in .env)
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(String(process.env.ENCRYPTION_SECRET || "default_secret_key"))
  .digest();

exports.encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted + ":" + iv.toString("hex");
};

exports.decrypt = (encryptedText) => {
  const [encrypted, ivHex] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
