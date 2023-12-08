import express from "express";
import db_orderCtrl from "../../controllers/dashboard/order.js";
const db_orderRouter = express.Router();
db_orderRouter.get("/order", db_orderCtrl.getByQuery);
db_orderRouter.patch(
  "/order/:orderId/next-status",
  db_orderCtrl.updateToNextStatus
);
db_orderRouter.patch(
  "/:orderId/previous-status",
  db_orderCtrl.updateToPreviousStatus
);
db_orderRouter.patch("/:orderId/:status", db_orderCtrl.updateStatus);
export default db_orderRouter;
