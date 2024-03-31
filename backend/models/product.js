import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add product name"],
        },
        photo: {
            type: String,
            required: [true, "Please add product photo"],
        },
        price: {
            type: Number,
            required: [true, "Please add product price"],
        },
        stock: {
            type: Number,
            required: [true, "Please add product stock"],
        },
        category: {
            type: String,
            required: [true, "Please add product category"],
            trim: true,
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
