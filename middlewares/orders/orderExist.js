import Orders from "../../models/order.js";

const orderExists = async (req, res, next) => {
  const order = await Orders.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  next();
};

export default orderExists;