import { Tag } from "../models/product.js";
const tagCtrl = {
  create: async (req, res) => {
    try {
      const newTag = await Tag.create(req.body);
      res.status(200).json(newTag);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  remove: async () => {
    try {
      await Tag.destroy();
      res.status(200).json("remove successed");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async () => {
    try {
      const tags = await Tag.findAll();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default tagCtrl;
