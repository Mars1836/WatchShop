import Product from "../../models/product.js";
import Admin from "../../models/dashboard/admin.js";
const adminCtrl = {
  removeAllData: (req, res) => {},
  createAdminAccount: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const newAdmin = await Admin.create({ username, password, email });
      res.json(newAdmin.toJSON());
    } catch (error) {
      res.json(error);
    }
  },
};
export default adminCtrl;
