import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.js";
import UserProfile from "../models/user_profile.js";
import * as dotenv from "dotenv";
import CryptoJS from "crypto-js";
import userService from "../services/user.js";
dotenv.config();
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    console.log("local login");
    const user = await User.findOne({
      where: {
        type: "local",
        username: username,
      },
      include: {
        model: UserProfile,
      },
    });
    if (!user) {
      return cb({ message: "Incorrect username or password" });
    }
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    );
    var passwordDecriped = bytes.toString(CryptoJS.enc.Utf8);
    if (password === passwordDecriped) {
      console.log("user", user);
      return cb(null, user);
    } else {
      return cb({ message: "Incorrect username or password" });
    }
  })
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // find the user with the given google id

        const user = await User.findOne({
          where: { type: "google", external_id: profile.id },
        });
        if (user) {
          return done(null, user);
        }
        let newUser = await userService.googleCreate(profile);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser(function (user, cb) {
  console.log("serialize", user.id);
  if (user?.id) {
    return cb(null, user.id);
  }
  return cb("Authenticate user failed");
});
passport.deserializeUser(async function (id, cb) {
  console.log("deserializeUser");
  const user = await User.findOne({ where: { id: id } });
  if (user) {
    return cb(null, user);
  }
  return cb(null, {});
});
export default passport;
