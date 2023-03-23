import passport from "passport";
import { decodeJWT } from "../utils/helper.js";
import UserProfile from "../models/user_profile.js";
const verifyAsUser = async (req, res, next) => {
  const authValue = req.headers.authorization;
  let token;
  if (authValue) {
    token = authValue.slice(7);
    const user = decodeJWT(token);
    const userProfile = await UserProfile.findOne({ where: { id: user.id } });
    req.userId = user.id;
    req.profile = userProfile;

    if (user) {
      next();
      return;
    }
  }
  res.status(500).json({ message: "You must authenticate as user." });
};
export default verifyAsUser;
