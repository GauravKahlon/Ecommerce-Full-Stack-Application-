import { nodeCache } from "../app.js";
import { Order } from "../models/order.js";
import { invalidateCache } from "../utils/InvalidateCache.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { reduceStock } from "../utils/reduceStock.js";

export const newOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;
        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
            return next(new ErrorHandler("Please add all fields", 400));
        }
        await Order.create({ shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total });

        reduceStock(orderItems);
        await invalidateCache({ product: true, order: true, admin: true, userId: user, productId: orderItems.map((item) => item.productId) });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
        });
    } catch (error) {
        next(error);
    }
};
export const myOrders = async (req, res, next) => {
    try {
        const { id } = req.query;
        let orders = [];
        const key = `myOrders-${id}`;

        if (nodeCache.has(key)) {
            orders = JSON.parse(nodeCache.get(key));
        } else {
            orders = await Order.find({ user: id });
            if (orders.length < 1) return next(new ErrorHandler("Order not found", 404));

            nodeCache.set(key, JSON.stringify(orders));
        }

        return res.json({
            success: true,
            orders,
        });
    } catch (error) {
        next(error);
    }
};
export const getAllOrders = async (req, res, next) => {
    try {
        let orders;
        const key = "allOrders";

        if (nodeCache.has(key)) {
            orders = JSON.parse(nodeCache.get(key));
        } else {
            orders = await Order.find({}).populate("user", "name");
            if (orders.length < 1) return next(new ErrorHandler("Order not found", 404));

            nodeCache.set(key, JSON.stringify(orders));
        }

        return res.json({
            success: true,
            orders,
        });
    } catch (error) {
        next(error);
    }
};

export const getSingleOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const key = `order-${id}`;

        let order;

        if (nodeCache.has(key)) {
            order = JSON.parse(nodeCache.get(key));
        } else {
            order = await Order.findById(id).populate("user", "name");
            if (!order) return next(new ErrorHandler("Order not found", 404));

            nodeCache.set(key, JSON.stringify(order));
        }

        return res.json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const processOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) return next(new ErrorHandler("Order not found", 404));

        switch (order.status) {
            case "Processing":
                order.status = "Shipped";
                break;

            case "Shipped":
                order.status = "Delivered";
                break;

            default:
                order.status = "Delivered";
                break;
        }
        await order.save();

        await invalidateCache({ product: false, order: true, admin: true, userId: order.user, orderId: order._id });

        return res.json({
            success: true,
            message: "Order processed successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) return next(new ErrorHandler("Order not found", 404));

        await order.deleteOne();

        await invalidateCache({ product: false, order: true, admin: true, userId: order.user, orderId: order._id });

        return res.json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
