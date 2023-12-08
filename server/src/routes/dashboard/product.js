import express from "express";
import db_productCtrl from "../../controllers/dashboard/product.js";
const db_productRouter = express.Router();
db_productRouter.post("/product", db_productCtrl.create);
db_productRouter.delete("/product", db_productCtrl.delete);

export default db_productRouter;
