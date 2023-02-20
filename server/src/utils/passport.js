import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.js";
import UserProfile from "../models/user_profile.js";
import * as dotenv from "dotenv";
dotenv.config();
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({
      where: {
        username: username,
      },
      include: {
        model: UserProfile,
      },
    });

    if (!user) {
      return cb({ message: "Incorrect username or password" });
    }
    if (password === user.password) {
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
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // find the user with the given google id
        const user = await User.findOne({ where: { googleId: profile.id } });
        if (user) {
          return done(null, user);
        }

        // if the user doesn't exist, create a new one
        User.create({ googleId: profile.id }).then(async (user) => {
          await UserProfile.create({
            name: profile.name,
            avatar: profile.picture,
          });
          return cb(null, user);
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);
// passport.serializeUser(function (user, cb) {
//   console.log("serialize\n");
//   return cb(null, user.id);
// });
// passport.deserializeUser(async function (id, cb) {
//   const user = await User.findOne({ where: { id: id } });
//   console.log("decode", user);
//   if (user) {
//     return cb(null, user);
//   }
// });
export default passport;
