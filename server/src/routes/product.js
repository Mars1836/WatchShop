import express from "express";
import productCtrl from "../controllers/product.js";
const productRouter = express.Router();
productRouter.post("/insert", productCtrl.create);
productRouter.get("/get-all", productCtrl.getAll);
export default productRouter;
