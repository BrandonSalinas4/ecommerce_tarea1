import { Router } from "express";
import {DeleteProductById, GetProductById, UpdateProductById, CreateNewProduct,} from "../controllers/products.controllers.js";
import productExists from "../middlewares/products/productExist";
import checkByIdProduct from "../middlewares/products/checkIdProduct.js";
import { body } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import authorizateUser from "../middlewares/users/authorizateUser.middleware.js";

  const productsRoutes = Router();
  
  // Ruta para obtener un producto por ID
  productsRoutes.get("/:id", [checkByIdProduct, productExists, authorizateUser], GetProductById);
  
  // Ruta para crear un producto
  productsRoutes.post(
    "/",
    [
      body("nameproduct", "nameproduct not valid").exists().isString(),
      body("userproduct", "userproduct not valid").exists().isString(),
      body("codproduct", "codproduct invalid").exists().isString().isLength({
        min: 1,
        max: 5,
      }),
      validateDataMiddleware, authorizateUser,
    ],
    CreateNewProduct
  );
  
  // Ruta para modificar un producto por ID
  productsRoutes.patch("/:id", [checkByIdProduct, productExists, authorizateUser], UpdateProductById);
  
  // Ruta para eliminar un producto por ID
  productsRoutes.delete("/:id", [checkByIdProduct, productExists, authorizateUser], DeleteProductById);
  
  export default productsRoutes;