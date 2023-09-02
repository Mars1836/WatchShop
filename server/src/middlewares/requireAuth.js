import passport from "passport";
import { decodeJWT } from "../utils/helper.js";
import UserProfile from "../models/user_profile.js";
const verifyAsUser = async (req, res, next) => {
  console.log("very 1");

  if (req.user) {
    try {
      const user = req.user;
      const userProfile = await UserProfile.findOne({
        where: { userId: user.id },
      });
      req.userId = user.id;
      req.profile = userProfile;
      if (userProfile) {
        next();
      }
      return;
    } catch (error) {
      res.status(500).json({ message: error?.message || error });
      return;
    }
  } else {
    res.status(500).json({ message: "You must authenticate as user." });
    return;
  }
};
export default verifyAsUser;
