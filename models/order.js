import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Orders = dbConnection.define("orders", {
  idorder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
});

Orders.sync();
export default Orders;