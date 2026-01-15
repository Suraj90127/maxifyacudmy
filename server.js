const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/* ================= DB ================= */
const db = require("./config/db");

/* ================= ROUTES ================= */
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const coursePurchaseRoutes = require("./routes/coursePurchaseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const blogRoutes = require("./routes/blogRoutes");
const courseContentRoutes = require("./routes/courseContentRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const supportRoutes = require("./routes/supportTicketRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
const socialLinksRoutes = require("./routes/socialLinksRoutes");
const courseProgressRoutes = require("./routes/courseProgressRoutes");


const app = express();

/* ================= CONNECT DB FIRST ================= */
db();

/* ================= MIDDLEWARE ================= */
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

/* ================= STATIC UPLOADS ================= */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ================= API ROUTES ================= */
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/purchase", coursePurchaseRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/course-content", courseContentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/support", supportRoutes);
app.use("/pdf", pdfRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/social-links", socialLinksRoutes);
app.use("/api/progress", courseProgressRoutes);
app.use("/api/withdrawal", withdrawalRoutes);
app.use('/api/amount',require('./routes/amountRoute'))
app.use("/api/certificate", require("./routes/certificateRoutes"));



const clientPath = path.join(__dirname, "./client/dist");

app.use(express.static(clientPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
