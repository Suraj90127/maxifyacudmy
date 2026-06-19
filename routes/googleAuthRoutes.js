const router = require("express").Router();
const passport = require("passport");
const createToken = require("../utils/createToken");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// routes/googleAuthRoutes.js
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;

      const token = createToken({
        id: user._id,
        role: user.role,
        name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
        email: user.email,
        mobile: user.mobile,
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure:
          process.env.NODE_ENV ===
          "production",
        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      });
      // Frontend page
      res.redirect("https://maxifyacademy.com/auth/google/callback");

    } catch (error) {
      res.redirect(
        `https://maxifyacademy.com/login?error=${encodeURIComponent(error.message)}`
      );
    }
  }
);

module.exports = router;