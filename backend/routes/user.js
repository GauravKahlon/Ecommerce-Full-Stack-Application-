import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminCheck } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newUser);
app.get("/all", adminCheck, getAllUsers);
app.get("/:id", adminCheck, getUser);
app.delete("/:id", adminCheck, deleteUser);

export default app;
