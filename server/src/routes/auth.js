import express from "express";
import authCtrl from "../controllers/auth.js";
import verifyAsUser from "../middlewares/requireAuth.js";
import passport from "passport";
const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

authRouter.get(
  "/google-login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000",
  })
);

authRouter.post("/logout", verifyAsUser, authCtrl.logout);
authRouter.post("/verifytoken", verifyAsUser, authCtrl.verifyToken);
export default authRouter;
