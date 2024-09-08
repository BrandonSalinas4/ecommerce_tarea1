import { Router } from "express";
import { GetOrderById, CreateOrder, UpdateOrderById, DeleteOrderById,} from "../controllers/orders.controllers.js";
import checkByIdOrder from "../middlewares/orders/checkIdOrder.js";
import orderExists from "../middlewares/orders/orderExist.js";
import { body } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import authorizateUser from "../middlewares/users/authorizateUser.middleware.js";
  
  const ordersRoutes = Router();
  
  // Ruta para obtener una orden por ID
  ordersRoutes.get("/:id", [checkByIdOrder, orderExists, authorizateUser], GetOrderById);
  
  // Ruta para crear una orden
  ordersRoutes.post(
    "/",
    [
      body("idorder", "idorder not valid").exists().isString(),
      body("productid", "productid not valid").exists().isString().isLength({
        min: 1,
        max: 5,
      }),
      body("price", "price invalid").exists().isString(),
      body("quantity", "quantity invalid").exists().isString(),
      validateDataMiddleware, authorizateUser,
    ],
    CreateOrder
  );
  
  // Ruta para modificar una orden por ID
  ordersRoutes.patch("/:id", [checkByIdOrder, orderExists, authorizateUser], UpdateOrderById);
  
  // Ruta para eliminar una orden por ID
  ordersRoutes.delete("/:id", [checkByIdOrder, orderExists, authorizateUser], DeleteOrderById);
  
  export default ordersRoutes;