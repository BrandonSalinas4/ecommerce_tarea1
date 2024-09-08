import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRouter from "./routes/products.routes.js"
import usersRouter from "./routes/users.routes";
import ordersRoutes from "./routes/orders.routes.js";
import { dbConnection } from "./config/db.js";
import ApiRateLimit from "./middlewares/ratelimit/apiRateLimit.middleware";

const app = express();
// app.get("/", (req, res) => {
//   res.send("Prueba del Get");
// });

app.use(cors());
app.use(bodyParser());
app.use(ApiRateLimit);

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRoutes);

try {
    dbConnection.authenticate();
    console.log("Connected to DB");
} catch (error) {
    console.log(error);
}

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
