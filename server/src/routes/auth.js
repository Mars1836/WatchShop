import express from "express";
import authCtrl from "../controllers/auth.js";
import verifyAsUser from "../middlewares/requireAuth.js";
const authRouter = express.Router();

authRouter.post("/login", authCtrl.login);
authRouter.post("/logout", verifyAsUser, authCtrl.logout);
authRouter.post("/verifytoken", verifyAsUser, authCtrl.verifyToken);
export default authRouter;
