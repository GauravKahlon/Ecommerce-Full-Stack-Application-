import { Product } from "../models/product.js";
import { ErrorHandler } from "./errorHandler.js";

export const reduceStock = (orderItems) => {
    orderItems.forEach(async (orderItem) => {
        const product = await Product.findById(orderItem.productId);

        if (!product) throw new ErrorHandler("Product not found", 404);

        product.stock = orderItem.quantity;

        await product.save();
    });
};
