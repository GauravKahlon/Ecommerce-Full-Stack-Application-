import express from "express";
import { deleteProduct, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, searchAllProducts, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminCheck } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", adminCheck, singleUpload, newProduct);
app.get("/latest", getLatestProducts);
app.get("/categories", getAllCategories);
app.get("/admin/all", adminCheck, getAllProducts);
app.route("/:id").get(getSingleProduct).put(singleUpload, updateProduct).delete(deleteProduct);
app.get("/search/all", searchAllProducts);
export default app;
