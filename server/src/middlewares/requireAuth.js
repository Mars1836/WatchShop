import passport from "passport";
import { decodeJWT } from "../utils/helper.js";
const verifyAsUser = (req, res, next) => {
  const authValue = req.headers.authorization;
  let token;
  if (authValue) {
    token = authValue.slice(7);
    const user = decodeJWT(token);
    req.userId = user.id;
    if (user) {
      next();
      return;
    }
  }
  res.status(500).json({ message: "You must authenticate as user." });
};
export default verifyAsUser;
