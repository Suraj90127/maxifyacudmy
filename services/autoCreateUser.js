const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateRandomPassword = require("../utils/generatePassword");
const { sendLoginCredentials } = require("../utils/emailService");

module.exports = async function autoCreateUser(email, mobile) {
  let user = await User.findOne({
    $or: [{ email }, { mobile }],
  });

  // user already exists
  if (user) return user;

  const plainPassword = generateRandomPassword(8);
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  user = await User.create({
    firstname: email.split("@")[0],
    lastname: "",
    email,
    mobile,
    password: hashedPassword,
    i_agree: true,
    role: "user",
    is_verified: true,
  });

  // 📧 Send credentials
  await sendLoginCredentials(email, plainPassword);

  return user;
};
