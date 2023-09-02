import express from "express";
import authCtrl from "../../controllers/dashboard/auth.js";

const authRouter = express.Router();
authRouter.post("/login", authCtrl.login);
authRouter.get("/login-success", authCtrl.loginSuccess);

authRouter.post("/verifylogin", authCtrl.verifyLogin);
authRouter.post("/logout", authCtrl.logout);
export default authRouter;
