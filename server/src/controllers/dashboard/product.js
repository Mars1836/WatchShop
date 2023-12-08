import Feedback from "../../models/feedback.js";
import FeedbackImage from "../../models/feedback_image.js";
import Product from "../../models/product.js";
import { Tag, Category } from "../../models/product.js";
import { handleQueryInput } from "../../utils/helper.js";

const db_productCtrl = {
  create: async (req, res) => {
    try {
      let newProduct;
      if (typeof req.body.length === "number") {
        newProduct = await Product.bulkCreate(
          req.body,

          {
            include: [Tag, Category],
          }
        );
      } else {
        newProduct = await Product.create(req.body, {
          include: [Tag, Category],
        });
      }
      console.log(req.body);
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    try {
      const r = Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json(r);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
};
export default db_productCtrl;
