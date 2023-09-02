import Address from "../models/address.js";
import UserProfile from "../models/user_profile.js";
import passport from "passport";
const authCtrl = {
  localLogin: passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/api/login-success",
  }),
  localLoginSuccess: (req, res) => {
    res.status(200).json(req.user);
  },
  googleLogin: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  logout: (req, res) => {
    try {
      req.logout(function (err) {
        if (err) return res.status(500).json({ message: err });
        res.status(200).json({ message: "Log out successed" });
      });
      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      res.status(500).json({ message: error?.message || error });
    }
  },
  verifyToken: async (req, res) => {
    try {
      if (!req.userId) {
        res.status(401).json("not auth");
        return;
      }

      const user = await UserProfile.findOne({
        where: { userId: req.userId },
        include: [{ model: Address }],
      });
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error?.message || error });
    }
  },
};
export default authCtrl;
