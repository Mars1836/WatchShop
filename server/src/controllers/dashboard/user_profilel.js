import UserProfile from "../../models/user_profile.js";
import { handleQueryInput } from "../../utils/helper.js";
const db_userProfileCtrl = {
  getByQuery: async (req, res) => {
    const { _findAll, _detail, ...query } = req.query;
    const [query1, query2] = handleQueryInput(query);
    try {
      if (_findAll) {
        const data = await UserProfile.findAll({
          where: {
            ...query1,
            ...query2,
          },
        });
        return res.status(200).json(data);
      }
      const data = await UserProfile.findOne({
        where: {
          ...query1,
          ...query2,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
};
export default db_userProfileCtrl;
