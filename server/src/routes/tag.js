import express from "express";
import tagCtrl from "../controllers/tag.js";
const tagRouter = express.Router();
tagRouter.post("/post/insert", tagCtrl.create);
tagRouter.get("/post/get-all", tagCtrl.getAll);
export default tagRouter;
