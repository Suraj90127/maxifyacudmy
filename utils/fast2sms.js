const axios = require("axios");

exports.sendOTP = async (mobile, otp) => {
  try {
    const payload = {
      route: "q",  
      sender_id: "TXTIND",
      message: `Verification Code: ${otp}`, 
      language: "english",
      numbers: mobile
    };

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      payload,
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Fast2SMS Response:", response);
    return true;
  } catch (err) {
    console.log("Fast2SMS Error:", err.response?.data || err.message);
    return false;
  }
};
