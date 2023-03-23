import Address from "../models/address.js";
import Order from "../models/order.js";
import OrderItem from "../models/order_item.js";
import Product from "../models/product.js";
const OrderItemCtrl = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.findAll({
        where: {
          userProfileId: req.userId,
        },
        include: [{ model: OrderItem, include: [Product] }, { model: Address }],
      });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { orderItems, ...orderData } = req.body;
      Order.create(
        {
          ...orderData,
          status: "Pending",
          userProfileId: req.userId,
        },
        {
          include: [Address],
        }
      ).then((order) => {
        OrderItem.bulkCreate(
          orderItems.map((items, index) => {
            return {
              ...orderItems[index],
              orderId: order.id,
            };
          })
        );
      });

      res.json("success");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  remove: async (req, res) => {},
};
export default OrderItemCtrl;
