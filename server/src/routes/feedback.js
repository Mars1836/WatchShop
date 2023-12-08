import express from "express";
import verifyAsUser from "../middlewares/require_auth.js";
import feedbackCtrl from "../controllers/feedback.js";
const feedbackRouter = express.Router();
feedbackRouter.post("/", verifyAsUser, feedbackCtrl.create);
feedbackRouter.get("/", feedbackCtrl.getByQuery);
feedbackRouter.get("/:productId", feedbackCtrl.getByProductId);

export default feedbackRouter;
