import Product from "../models/product.js";
import { Tag, Category } from "../models/product.js";

const productCtrl = {
  create: async (req, res) => {
    if (typeof req.body.length === "number") {
      const newProduct = await Product.bulkCreate(req.body, {
        include: [Tag, Category],
      });
    } else {
      const newProduct = await Product.create(req.body, {
        include: [Tag, Category],
      });
    }

    res.json("success");
  },

  getAll: async (req, res) => {
    const products = await Product.findAll({
      include: [Tag, Category],
    });

    res.status(200).json(products);
  },
};
export default productCtrl;
