import express from "express";
import UserProfile from "../models/user_profile.js";
import OrderItemCtrl from "../controllers/order.js";
const OrderItemRouter = express.Router();
OrderItemRouter.post("/add-order", OrderItemCtrl.create);
OrderItemRouter.get("/get-order", OrderItemCtrl.getOrder);
export default OrderItemRouter;
