import Order from "../models/order.js";
import OrderItem from "../models/order_item.js";
import Product from "../models/product.js";
const OrderItemCtrl = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.findOne({
        where: {
          userProfileId: req.userId,
        },
        include: { model: OrderItem, include: [Product] },
      });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const order = await Order.findOne({
        where: { userProfileId: req.userId },
      });
      const orderIem = await OrderItem.create({
        ...req.body,
        status: "Pending",
        orderId: order.id,
      });

      res.json("success");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  remove: async (req, res) => {},
};
export default OrderItemCtrl;
