import { nodeCache } from "../app.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";

export const invalidateCache = async ({ product, order, admin, orderId, userId, productId }) => {
    if (product) {
        let productKeys = ["latestProducts", "categoriesList", "allProducts"];
        console.log("ProductID", typeof productId);
        console.log("ProductID", productId);

        // const productIds = await Order.find({}).select("_id");

        // productIds.forEach(({ item: id }) => {
        //     productKeys.push(`product-${id}`);
        // });

        if (typeof productId === "string") productKeys.push(`product-${productId}`);
        if (typeof productId === "Object") productId.forEach((Id) => productKeys.push(`product-${Id}`));

        console.log("LOL");
        nodeCache.del(productKeys);
    }
    if (order) {
        let orderKeys = ["allOrders", `myOrders-${userId}`, `order-${orderId}`];

        // const orderIds = await Order.find({}).select("_id");

        // orderIds.forEach(({ item: id }) => {
        //     orderKeys.push(`order-${id}`);
        // });

        nodeCache.del(orderKeys);
    }
    if (admin) {
    }
};
