import express from "express";
import userRouter from "./routes/user.js ";
import productRouter from "./routes/product.js ";
import orderRouter from "./routes/order.js";
import { connectDB } from "./utils/connectDB.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";

config({
    path: "./config.env",
});

const app = express();

app.use(express.json());

connectDB();

export const nodeCache = new NodeCache();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res, next) => {
    res.send("Ecommerce Backend");
});

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is working on PORT: ${process.env.PORT}`);
});
