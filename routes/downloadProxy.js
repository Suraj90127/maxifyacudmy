// routes/downloadProxy.js
// Add this route to your Express backend
// Usage: GET /api/download-pdf?url=<encoded_pdf_url>&filename=lecture.pdf

const express = require("express");
const axios = require("axios"); // npm install axios
const { URL } = require("url");

const router = express.Router();

router.get("/download-pdf", async (req, res) => {
  const { url, filename = "lecture.pdf" } = req.query;

  if (!url) return res.status(400).json({ error: "url param required" });

  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(url);
    const parsed = new URL(decodedUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).json({ error: "Invalid URL" });
    }
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const safeFilename = filename
    .replace(/[^a-zA-Z0-9_\-\.]/g, "_")
    .substring(0, 100);

  try {
    const response = await axios.get(decodedUrl, {
      responseType: "arraybuffer",   // ← critical: get raw binary, not text
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/pdf,*/*",
      },
      maxRedirects: 5,               // follow S3/CDN redirects automatically
    });

    const buffer = Buffer.from(response.data);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "no-store");
    res.end(buffer);

  } catch (err) {
    console.error("PDF proxy error:", err.message);
    res.status(502).json({ error: "Could not fetch PDF" });
  }
});

module.exports = router;

// ────────────────────────────────────────────────
// In your main server file (app.js / index.js):
// ────────────────────────────────────────────────
// const downloadProxy = require("./routes/downloadProxy");
// app.use("/api", downloadProxy);