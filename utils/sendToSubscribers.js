const Subscription = require("../models/Subscription");
const { sendGeneralEmail } = require("./emailService");

/* ============================================================
   📢 SEND PROMOTIONAL / ANNOUNCEMENT EMAIL TO SUBSCRIBERS
   ============================================================ */
exports.sendToSubscribers = async ({ subject, message, ctaText, ctaLink }) => {
  try {
    const subscribers = await Subscription.find({});

    if (!subscribers.length) return;

    const enhancedMessage = `
      <p style="font-size:15px;line-height:1.7;">
        ${message}
      </p>

      ${
        ctaLink
          ? `
        <div style="text-align:center;margin:30px 0;">
          <a href="${ctaLink}"
            style="
              display:inline-block;
              padding:14px 36px;
              background:linear-gradient(135deg,#22d3ee,#0ea5e9);
              color:#020617;
              text-decoration:none;
              font-weight:700;
              border-radius:999px;
              font-size:15px;
            ">
            ${ctaText || "Explore Now"}
          </a>
        </div>
        `
          : ""
      }

      <p style="font-size:13px;color:#94a3b8;margin-top:25px;">
        You’re receiving this email because you subscribed to Maxify Academy.
      </p>
    `;

    for (const sub of subscribers) {
      await sendGeneralEmail({
        email: sub.email,
        subject,
        message: enhancedMessage,
      });
    }

  } catch (err) {
    console.log("Subscriber Email Error:", err);
  }
};
