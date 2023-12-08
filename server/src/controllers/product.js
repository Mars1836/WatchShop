import redisClient from "../database/redis_connection.js";
import Feedback from "../models/feedback.js";
import FeedbackImage from "../models/feedback_image.js";
import Product from "../models/product.js";
import { Tag, Category } from "../models/product.js";
import UserProfile from "../models/user_profile.js";
import { handleQueryInput } from "../utils/helper.js";

const productCtrl = {
  getByQuery: async (req, res) => {
    const { _findAll, _detail, ...query } = req.query;
    const [query1, query2] = handleQueryInput(query);
    try {
      if (_findAll) {
        const data = await Product.findAll({
          where: {
            ...query1,
            ...query2,
          },
          include: !_detail
            ? [{ model: Tag }, { model: Category }]
            : [
                { model: Tag },
                { model: Category },
                { model: Feedback, include: { model: UserProfile } },
              ],
        });
        return res.status(200).json(data);
      }
      const data = await Product.findOne({
        where: {
          ...query1,
          ...query2,
        },
        include: !_detail
          ? [{ model: Tag }, { model: Category }]
          : [
              { model: Tag },
              { model: Category },
              {
                model: Feedback,
                include: [{ model: UserProfile }, { model: FeedbackImage }],
              },
            ],
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  getAll: async (req, res) => {
    const cacheKey = req.originalUrl;
    try {
      const products = await Product.findAll({
        include: [Tag, Category],
      });
      res.status(200).json(products);
      try {
        await redisClient.setEx(
          cacheKey,
          60 * 10,
          JSON.stringify(products),
          {}
        );
      } catch (error) {
        console.log(error?.message, error);
      }
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
};
export default productCtrl;
