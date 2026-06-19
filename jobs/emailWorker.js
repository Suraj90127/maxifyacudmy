const EmailQueue = require("../models/EmailQueue");
const { sendLoginCredentials } = require("../utils/emailService");

const processEmails = async () => {
  const emails = await EmailQueue.find({
    status: "pending",
  }).limit(20);

  for (const item of emails) {
    try {
      await sendLoginCredentials(
        item.email,
        item.password
      );

      item.status = "sent";
      await item.save();
    } catch (err) {
      item.retryCount += 1;
      item.lastError = err.message;

      if (item.retryCount >= 5) {
        item.status = "failed";
      }

      await item.save();
    }
  }
};

module.exports = processEmails;