import express from "express";
import productCtrl from "../controllers/product.js";
import redisCaching from "../middlewares/redis_caching.js";
const productRouter = express.Router();
productRouter.get("/get-all", redisCaching, productCtrl.getAll);
productRouter.get("", productCtrl.getByQuery);
export default productRouter;
