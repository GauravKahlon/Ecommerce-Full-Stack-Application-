import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { rm } from "fs";
import { nodeCache } from "../app.js";
import { invalidateCache } from "../utils/InvalidateCache.js";

export const newProduct = async (req, res, next) => {
    const { name, price, category, stock } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !category || !stock) {
        fs.rm(photo.path, () => {
            console.log("Photo deleted successfully");
        });

        return next(new ErrorHandler("Please add all fields", 400));
    }
    await Product.create({
        name,
        price,
        stock,
        category,
        photo: photo.path,
    });

    invalidateCache({ product: true });

    return res.status(201).json({
        success: true,
        message: "Product created successfully",
    });
};

export const getLatestProducts = async (req, res, next) => {
    let products;
    if (nodeCache.has("latestProducts")) {
        products = JSON.parse(nodeCache.get("latestProducts"));
    } else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        nodeCache.set("latestProducts", JSON.stringify(products));
    }

    return res.status(201).json({
        success: true,
        products,
    });
};
export const getAllCategories = async (req, res, next) => {
    let categories;
    if (nodeCache.has("categoriesList")) {
        categories = JSON.parse(nodeCache.get("categoriesList"));
    } else {
        categories = await Product.distinct("category");
        nodeCache.set("categoriesList", JSON.stringify(categories));
    }
    return res.status(201).json({
        success: true,
        categories,
    });
};

export const getAllProducts = async (req, res, next) => {
    let products;
    if (nodeCache.has("allProducts")) {
        products = JSON.parse(nodeCache.get("allProducts"));
    } else {
        products = await Product.find({});
        nodeCache.set("allProducts", JSON.stringify(products));
    }

    return res.status(201).json({
        success: true,
        products,
    });
};

export const getSingleProduct = async (req, res, next) => {
    const { id } = req.params;
    let product;
    if (nodeCache.has(`product-${id}`)) {
        product = JSON.parse(nodeCache.get(`product-${id}`));
    } else {
        product = await Product.findById(id);
        if (!product) return next(new ErrorHandler("Product not found", 404));
        nodeCache.set(`product-${id}`, JSON.stringify(product));
    }

    return res.status(201).json({
        success: true,
        product,
    });
};

export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product not found", 404));

    if (photo) {
        rm(product.photo, () => {
            console.log("Old photo deleted");
        });
        product.photo = photo.path;
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();

    await invalidateCache({ product: true, productId: String(product._id) });

    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
    });
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    console.log("Before", product);
    await product.deleteOne();
    console.log("After", product);
    console.log("After product Id", product._id);
    console.log("After product Id String", String(product._id));
    await invalidateCache({ product: true, productId: String(product._id) });

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
};

export const searchAllProducts = async (req, res, next) => {
    const { search, sort, category, price, page } = req.query;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery = {};

    if (search)
        baseQuery.name = {
            $regex: search,
        };

    if (price) {
        baseQuery.price = {
            $lte: Number(price),
        };
    }

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

    const filteredProductsPromise = Product.find(baseQuery);

    const [products, filteredProducts] = await Promise.all([productsPromise, filteredProductsPromise]);

    const totalPages = Math.ceil(filteredProducts.length / limit);
    return res.status(200).json({
        success: true,
        products,
        totalPages,
    });
};
