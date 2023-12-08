import express from "express";
import UserProfile from "../models/user_profile.js";
import orderCtrl from "../controllers/order.js";
const orderRouter = express.Router();
orderRouter.post("/empty", orderCtrl.empty);
orderRouter.get("/:orderId", orderCtrl.getById);
orderRouter.get("/", orderCtrl.getByQuery);
orderRouter.post("/", orderCtrl.create);

export default orderRouter;
