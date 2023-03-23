import passport from "passport";
import Address from "../models/address.js";
import UserProfile from "../models/user_profile.js";
import { generateJWT, decodeJWT } from "../utils/helper.js";
const authCtrl = {
  login: (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false },
      function (error, user, info) {
        if (error) {
          return res.status(500).json({ error });
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        return res.json({
          message: "Login successful",
          token: generateJWT(user),
          user: user.user_profile,
        });
      }
    )(req, res, next);
  },
  /*  */ logout: (req, res) => {
    req.logout(function (err) {
      if (err) return res.status(500).json({ message: err });
      res.status(200).json({ message: "Log out successed" });
    });
  },
  register: (req, res) => {},
  verifyToken: async (req, res) => {
    try {
      const { token } = req.body;
      const { id } = decodeJWT(token);
      if (!id) {
        res.status(401).json("not auth");
      }

      const user = await UserProfile.findOne({
        where: { userId: id },
        include: [{ model: Address }],
      });
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default authCtrl;
