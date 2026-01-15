const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ============================================================
   📧 COMMON LIGHT EMAIL WRAPPER (SCREENSHOT STYLE)
   ============================================================ */
const emailWrapper = (title, subtitle, bodyHTML) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    @media (max-width:600px){
      .container{width:100%!important}
      .content{padding:20px!important}
    }
  </style>
</head>

<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 10px;">
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 10px 40px rgba(0,0,0,0.1);
        ">

          <!-- HEADER -->
          <tr>
            <td style="
              background:linear-gradient(135deg,#22d3ee,#0ea5e9);
              padding:30px;
              text-align:center;
            ">
              <h1 style="margin:0;color:#ffffff;font-size:26px;">${title}</h1>
              <p style="margin-top:8px;color:#e0f2fe;font-size:14px;">
                ${subtitle}
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td class="content" style="padding:30px;color:#334155;">
              ${bodyHTML}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              text-align:center;
              padding:18px;
              font-size:12px;
              color:#94a3b8;
              border-top:1px solid #e5e7eb;
            ">
              If you did not sign up for this account, you can safely ignore this email.<br/><br/>
              © 2025 MaxifyAcademy. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/* ============================================================
   1️⃣ ACCOUNT VERIFICATION OTP
   ============================================================ */
exports.sendAccountVerificationOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Maxify Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Maxify Academy Account",
      html: emailWrapper(
        "Verify Your Account",
        "Complete your signup to get instant access 🚀",
        `
        <p>Hi there,</p>
        <p>Use the OTP below to verify your account:</p>

        <div style="
          margin:24px 0;
          padding:16px;
          background:#f8fafc;
          border-radius:10px;
          border:1px dashed #22d3ee;
          text-align:center;
        ">
          <h2 style="
            margin:0;
            font-size:28px;
            letter-spacing:6px;
            color:#0284c7;
          ">${otp}</h2>
        </div>

        <p style="font-size:13px;color:#64748b;">
          ⏱ OTP valid for 5 minutes
        </p>
        `
      ),
    });
    return true;
  } catch (err) {
    console.log("Verification OTP Error:", err);
    return false;
  }
};

/* ============================================================
   2️⃣ RESET PASSWORD OTP
   ============================================================ */
exports.sendResetPasswordOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Maxify Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: emailWrapper(
        "Password Reset",
        "Secure your account access 🔐",
        `
        <p>You requested a password reset.</p>

        <div style="
          margin:24px 0;
          padding:16px;
          background:#f8fafc;
          border-radius:10px;
          border:1px dashed #ef4444;
          text-align:center;
        ">
          <h2 style="
            margin:0;
            font-size:28px;
            letter-spacing:6px;
            color:#dc2626;
          ">${otp}</h2>
        </div>

        <p style="font-size:13px;color:#64748b;">
          ⚠ If this wasn't you, ignore this email
        </p>
        `
      ),
    });
    return true;
  } catch (err) {
    console.log("Reset OTP Error:", err);
    return false;
  }
};

/* ============================================================
   3️⃣ GENERAL EMAIL
   ============================================================ */
exports.sendGeneralEmail = async ({ email, subject, message }) => {
  try {
    await transporter.sendMail({
      from: `"Maxify Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: emailWrapper(
        subject,
        "Important update from Maxify Academy",
        `<p>${message}</p>`
      ),
    });
  } catch (err) {
    console.log("General Email Error:", err);
  }
};

/* ============================================================
   4️⃣ LOGIN CREDENTIALS (AFTER PAYMENT)
   ============================================================ */
exports.sendLoginCredentials = async (email, password) => {
  try {
    await transporter.sendMail({
      from: `"Maxify Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to MaxifyAcademy",
      html: emailWrapper(
        "Welcome to MaxifyAcademy",
        "Your learning journey starts now 🚀",
        `
        <p>Hi there,</p>

        <p>
          Your account has been successfully created. Use the credentials below
          to login to your dashboard:
        </p>

        <div style="
          margin:22px 0;
          padding:18px;
          background:#f8fafc;
          border-radius:10px;
          border:1px solid #e5e7eb;
        ">
          <p style="margin:0 0 8px;">
            <strong>Email:</strong>
            <a href="mailto:${email}" style="color:#0284c7;text-decoration:none;">
              ${email}
            </a>
          </p>
          <p style="margin:0;">
            <strong>Password:</strong> ${password}
          </p>
        </div>

        <p style="font-size:14px;">
          Please login at
          <a href="https://maxifyacademy.com/login" style="color:#0284c7;">
            https://maxifyacademy.com/login
          </a>
          and change your password immediately after first login.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="https://maxifyacademy.com/login"
            style="
              background:#22d3ee;
              color:#ffffff;
              padding:14px 36px;
              text-decoration:none;
              font-weight:600;
              border-radius:999px;
              display:inline-block;
            ">
            Login to Your Account
          </a>
        </div>
        `
      ),
    });
    return true;
  } catch (err) {
    console.log("Login Credential Error:", err);
    return false;
  }
};
