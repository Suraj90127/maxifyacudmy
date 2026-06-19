const cron = require("node-cron");
const processEmails = require("../jobs/emailWorker");

cron.schedule("*/5 * * * *", async () => {
  console.log("Processing emails...");
  await processEmails();
});