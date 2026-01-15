const Subscription = require("../models/Subscription");

exports.createSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const existing = await Subscription.findOne({ email });
    if (existing)
      return res.status(200).json({ message: "Already subscribed" });

    await Subscription.create({ email });

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
