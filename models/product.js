import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Products = dbConnection.define("products", {
  nameproducts: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userproduct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codproduct: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
});

Products.sync();
export default Products;