import express from "express";

import db_userProfileCtrl from "../../controllers/dashboard/user_profilel.js";
const db_userProfileRouter = express.Router();

db_userProfileRouter.get("/", db_userProfileCtrl.getByQuery);
export default db_userProfileRouter;
