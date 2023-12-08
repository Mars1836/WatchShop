import express from "express";
import db_authCtrl from "../../controllers/dashboard/auth.js";

const db_authRouter = express.Router();
db_authRouter.post("/login", db_authCtrl.login);
db_authRouter.get("/login/success", db_authCtrl.loginSuccess);

db_authRouter.post("/verifylogin", db_authCtrl.verifyLogin);
db_authRouter.post("/logout", db_authCtrl.logout);
export default db_authRouter;
