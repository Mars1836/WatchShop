import Order from "../../models/order.js";
import { handleQueryInput } from "../../utils/helper.js";
import OrderItem from "../../models/order_item.js";
import Product from "../../models/product.js";
import Address from "../../models/address.js";
import UserProfile from "../../models/user_profile.js";
import { ORDER_STATUS } from "../../utils/consts.js";
const db_orderCtrl = {
  getByQuery: async (req, res) => {
    const { _findAll, _detail, ...query } = req.query;
    const [query1, query2] = handleQueryInput(query);
    try {
      if (_findAll) {
        const data = await Order.findAll({
          where: {
            ...query1,
            ...query2,
          },
          include: [
            { model: OrderItem, include: [{ model: Product }] },
            { model: Address },
            { model: UserProfile },
          ],
        });
        return res.status(200).json(data);
      }
      const data = await Order.findOne({
        where: {
          ...query1,
          ...query2,
        },
        include: [
          { model: OrderItem, include: [{ model: Product }] },
          { model: Address },
          { model: UserProfile },
        ],
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  updateById: async (req, res) => {
    const params = req.params;
    const payload = req.body;
    try {
      const data = await Order.findOne({
        where: {
          id: params.orderId,
        },
      });
      data = {
        ...data,
        ...payload,
      };
      const newData = await data.save();
      res.status(200).json(newData);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  updateToNextStatus: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await Order.findOne({
        where: {
          id: orderId,
        },
      });
      const index = ORDER_STATUS.findIndex((item) => {
        return item === order.status;
      });
      if (index < ORDER_STATUS.length - 1) {
        const nextStatus = ORDER_STATUS[index + 1];
        order.status = nextStatus;
        const a = await order.save();
        res.status(200).json(a);
      } else {
        res.status(500).json("This is end of status");
      }
    } catch (error) {
      console.log(123);
      res.status(500).json(error?.message || error);
    }
  },
  updateToPreviousStatus: async (req, ses) => {},
  updateStatus: async (req, res) => {
    const params = req.params;
    try {
      let data = await Order.findOne({
        where: {
          id: params.orderId,
        },
      });

      data.status = params.status;

      const newData = await data.save();
      res.status(200).json(newData);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
};
export default db_orderCtrl;
