import express from "express";
import UserProfile from "../models/user_profile.js";
import orderItemCtrl from "../controllers/order_item.js";
const orderItemRouter = express.Router();
orderItemRouter.post("/add-order", orderItemCtrl.create);
orderItemRouter.get("/get-order", orderItemCtrl.getOrder);
orderItemRouter.get("", orderItemCtrl.getByQuery);

export default orderItemRouter;
