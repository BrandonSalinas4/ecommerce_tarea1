import Products from "../../models/product.js";

const productExists = async (req, res, next) => {
  const prod = await Products.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!prod) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  next();
};

export default productExists;