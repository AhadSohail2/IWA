const { validationResult } = require('express-validator');

const fs = require("fs");
const path = require("path");

const CategoryModel = require('../models/Category');
const ProductModel = require('../models/Product');
const QueryModel = require('../models/Quries');
const NewsLetterModel = require('../models/Newsletter');
const AppDataModel = require('../models/AppData');
const UsersModel = require('../models/Users');
const OrderModel = require('../models/Order');

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
};

//Newletter

exports.getNewsLetter = async (req, res, next) => {
    try {
        const newsletters = await NewsLetterModel.find();
        res.status(200).json({ message: "Featched", newsletters })
    } catch (err) {
        next(err)
    }
}

exports.deleteNewsLetter = async (req, res, next) => {
    const id = req.params.id;
    try {
        await NewsLetterModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Newsletter Deleted" })
    } catch (err) {
        next(err)
    }
}

//Users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await UsersModel.find();
        res.status(200).json({ message: "Featched", users })
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        await UsersModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User Deleted" })
    } catch (err) {
        next(err)
    }
}


//Categories

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({ message: "Featched", categories })
    } catch (err) {
        next(err)
    }
}

exports.deleteCategories = async (req, res, next) => {
    const id = req.params.id;
    try {
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Category Deleted" })
    } catch (err) {
        next(err)
    }
}

exports.putCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const id = req.body.id;
    try {
        const category = await CategoryModel.findById(id);
        category.name = categoryName;
        await category.save();
        res.json({ message: "Category Updated" })
    } catch (err) {
        next(err)
    }
}

exports.postCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    try {
        const newCategory = new CategoryModel({
            name: categoryName
        })
        await newCategory.save();
        res.status(201).json({ message: "Category Created" })
    } catch (err) {
        next(err)
    }
}

//Query

exports.getQuery = async (req, res, next) => {
    try {
        const query = await QueryModel.find();
        res.status(200).json({ message: "Featched", query })
    } catch (err) {
        next(err)
    }
}

exports.deleteQuery = async (req, res, next) => {
    const id = req.params.id;
    try {
        await QueryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Query Deleted" })
    } catch (err) {
        next(err)
    }
}

//CMS

exports.getCMS = async (req, res, next) => {
    try {
        const cms = await AppDataModel.find();
        res.status(200).json({ message: "Featched", cms })
    } catch (err) {
        next(err)
    }
}

exports.putCMS = async (req, res, next) => {
    const { upperLine, deliveryCharges } = req.body;
    try {
        const appData = await AppDataModel.findById(1);
        appData.upperLine = upperLine;
        appData.deliveryCharges = deliveryCharges;
        await appData.save();
        res.status(200).json({ message: "App Data Updated" });
    } catch (err) {
        next(err)
    }
}

//Orders
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.find().populate('userID', 'name').select('totalBill createdAt status products');
        res.status(200).json({ message: "Orders Fetched", orders });
    } catch (err) {
        next(err);
    }
}

exports.getOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await OrderModel.findById(id).populate('userID', 'name PostalAddress phoneNo WhatsNo address').populate('products._id', 'name images slang dPrice');
        res.status(200).json({ message: "Order Fetched", order });
    } catch (err) {
        next(err);
    }
}

exports.putOrder = async (req, res, next) => {
    const id = req.params.id;
    const status = req.body.status;
    const willReachIn = req.body.willReachIn;
    try {
        const order = await OrderModel.findById(id);
        order.status = status;
        order.willReachIn = willReachIn;
        await order.save();
        res.status(201).json({ message: "Updated" })
    } catch (err) {
        next(err)
    }
}

exports.deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        await OrderModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Order Deleted" })
    } catch (err) {
        next(err)
    }
}

//Products

exports.getProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find().populate('category').select("images name price dPrice isFeatured slang sales createdAt");
        res.status(200).json({ message: "Products Fetched", products });
    } catch (err) {
        next(err);
    }
}

exports.getProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await ProductModel.findById(id).populate('category');
        res.status(200).json({ message: "Product Fetched", product });
    } catch (err) {
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Product Deleted" });
    } catch (err) {
        next(err);
    }
}



exports.postProduct = async (req, res, next) => {
    try {
        const { id, name, slang, colors, sizes, description, inStock, isFeatured, price, dPrice, category, tags, alt } = req.body;
        const images = [];
        const preProduct = await ProductModel.findOne({ slang: slang });
        if (preProduct) {
            const err = new Error("Already Exists");
            err.statusCode = 422;
            throw err;
        }
        try {
            for (const key in req.files) {
                images.push({ url: `${process.env.BACKEND}/products/${slang}/${req.files[key].filename}`, alt: alt })
            }
            const newProduct = new ProductModel({
                _id: id,
                name: name,
                slang: slang,
                category: category,
                colors: colors,
                sizes: sizes,
                description: description,
                dPrice: dPrice,
                price: price,
                images: images,
                inStock: inStock,
                isFeatured: isFeatured,
                tags: tags,
                sales: 0
            })
            await newProduct.save();
            res.status(201).json("Products Created");
        } catch (err) {
            fs.rmSync(path.join(__dirname, `../uploads/products/${slang}`), { recursive: true, force: true })
            next(err)
        }
    } catch (err) {
        next(err);
    }
}

exports.putProduct = async (req, res, next) => {

}