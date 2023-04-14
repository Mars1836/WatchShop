import express from "express";
import userCtrl from "../controllers/user.js";
const userRouter = express.Router();
userRouter.get("/get-all", userCtrl.getAll);
userRouter.post("/insert", userCtrl.localSighUp);
userRouter.get("/get-by-id/:id", userCtrl.getById);
export default userRouter;
