import express from "express";
import adminCtrl from "../../controllers/dashboard/admin.js";
const adminRouter = express.Router();
adminRouter.post("/admin/account", adminCtrl.createAdminAccount);
export default adminRouter;
