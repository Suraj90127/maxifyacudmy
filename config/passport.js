const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/UserModel");

// Generate Unique Referral Code
const generateNumericReferralCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    exists = await User.findOne({
      referral_code: code,
    });
  }

  return code;
};


{
  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log(process.env.GOOGLE_CLIENT_SECRET);
  console.log(process.env.GOOGLE_CALLBACK_URL)
  console.log(process.env.FRONTEND_URL);
  console.log(process.env.NODE_ENV);
}



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://maxifyacademy.com/api/auth/google/callback",
    },






    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({ email });

        if (!user) {
          const referralCode =
            await generateNumericReferralCode();

          const FRONTEND =
            process.env.FRONTEND_URL ||
            "http://localhost:5555";

          const referralLink =
            `${FRONTEND}/r?ref=${referralCode}`;

          user = await User.create({
            firstname:
              profile.name?.givenName || "",
            lastname:
              profile.name?.familyName || "",
            username:
              profile.displayName ||
              email.split("@")[0],
            email,
            is_verified: true,
            profile_image:
              profile.photos?.[0]?.value || "",
            profile_complete: true,

            referral_code: referralCode,
            referral_link: referralLink,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;