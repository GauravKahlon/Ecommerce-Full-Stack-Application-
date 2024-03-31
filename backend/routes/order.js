import express from "express";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
import { adminCheck } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newOrder);
app.get("/my", myOrders);
app.get("/all", adminCheck, getAllOrders);
app.route("/:id").get(getSingleOrder).put(adminCheck, processOrder).delete(adminCheck, deleteOrder);
export default app;
