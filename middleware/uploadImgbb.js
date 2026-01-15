const axios = require("axios");
const FormData = require("form-data");

const uploadToImgbb = async (buffer) => {
  const apiKey = process.env.IMGBB_API_KEY;

  const base64Image = buffer.toString("base64");

  const formData = new FormData();
  formData.append("image", base64Image);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
    {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }
  );

  return response.data.data.url;
};

module.exports = uploadToImgbb;
