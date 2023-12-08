import Feedback from "../models/feedback.js";
import FeedbackImage from "../models/feedback_image.js";
import UserProfile from "../models/user_profile.js";
import { handleQueryInput } from "../utils/helper.js";
const feedbackCtrl = {
  create: async (req, res) => {
    try {
      const payload = req.body;

      const newFeedback = await Feedback.create({
        star: payload.star || 0,
        content: payload.content || "",
        productId: payload.productId,
        userProfileId: req.profile.id,
      });
      const feedbackImages = payload.feedbackImages.map((item) => {
        return {
          public_id: item.public_id,
          url: item.url,
          feedbackId: newFeedback.id,
        };
      });
      const a = await FeedbackImage.bulkCreate(feedbackImages);
      const feedbackWithImages = await Feedback.findOne({
        where: { id: newFeedback.id },
        include: [FeedbackImage],
      });

      res.status(200).json(feedbackWithImages);
    } catch (error) {
      res.status(500).json(error.message || error);
    }
  },
  getByQuery: async (req, res) => {
    const { _findAll, _detail, ...query } = req.query;
    const [query1, query2] = handleQueryInput(query);
    try {
      if (_findAll) {
        const data = await Feedback.findAll({
          where: {
            ...query1,
            ...query2,
          },
          include: [{ model: FeedbackImage }, { model: UserProfile }],
        });
        return res.status(200).json(data);
      }
      const data = await Feedback.findOne({
        where: {
          ...query1,
          ...query2,
        },
        include: [{ model: FeedbackImage }, { model: UserProfile }],
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  getByProductId: async (req, res) => {
    const params = req.params;
    try {
      const data = await Feedback.findAll({
        where: { productId: params.productId },
        order: [["createdAt", "DESC"]],
        include: [{ model: FeedbackImage }],
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error.message || error);
    }
  },
};
export default feedbackCtrl;
