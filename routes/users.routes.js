import { Router } from "express";
import { DeleteUserById, GetOneUserById, UpdateUserById, CreateUser, GetAllUsers, Login } from "../controllers/users.controllers.js";
import { body } from "express-validator";
import checkIdNumber from "../middlewares/users/checkIdNumber.middleware";
import userExists from "../middlewares/users/userExists.middleware";
import authorizateUser from "../middlewares/users/authorizateUser.middleware";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware";

const usersRouter = Router();

usersRouter.get("/", GetAllUsers);

// Ruta para obtener todos los usuarios por ID
usersRouter.get("/:id", [checkIdNumber, userExists], GetOneUserById);

// Ruta para el login
// GET => app.com/users/login/Bran/123
// POST { username: Bran, password: 123} => app.com/users/login
usersRouter.post("/login", Login);

// GET => app.com/users
// POST {name:"Bran"} => app.com/users

usersRouter.post(
    "/",
    [
        body("username", "Username not valid").exists().isString(),
        body("password", "Password invalid").exists().isString().isLength({
            min: 1,
            max: 10,
        }),
        validateDataMiddleware,
    ],
    CreateUser
);

// Ruta para modificar un usuario por ID
// PATCH { name: "Pepo" } => app.com/user/3
usersRouter.patch("/:id", [checkIdNumber, userExists], UpdateUserById);

// Ruta para eliminar un usuario por ID
usersRouter.delete("/:id",[checkIdNumber, userExists, authorizateUser], DeleteUserById);

export default usersRouter;
