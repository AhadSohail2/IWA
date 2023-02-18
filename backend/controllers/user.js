const CartModel = require('../models/Cart');
const ProductModel = require('../models/Product');
const UserSchema = require('../models/Users')
const OrderSchema = require('../models/Order');
const WishListModel = require('../models/WishList');
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const { Safepay } = require('@sfpy/node-sdk');
const { default: mongoose } = require('mongoose');

exports.getDummy = async (req, res, next) => {
    const newOrder = new OrderSchema({
        products: {
            _id: 1,
            selectedColor: "Red",
            selectedSize: "Green",
            quantity: 5
        },
        subTotalItems: 500,
        totalBill: 510,
        userID: "ahadsohail4@gmail.com",
        willReachIn: "10 Jan to 12 Jan"
    })
    await newOrder.save();
    res.json({ message: "Created" })
}

exports.postCart = async (req, res, next) => {

    const reqErr = validationResult(req);
    const id = req.userData.userId;
    const { proId, proColor, proSize, proQuan, action } = req.body;

    try {
        if (proQuan < 1) {
            const err = new Error("Make a valid request");
            err.statusCode = 422;
            throw err;
        }
        if (!reqErr.isEmpty()) {
            const err = new Error(reqErr.errors.map(d => d.msg));
            err.statusCode = 422;
            throw err;
        }

        const preCart = await CartModel.findOne({ userID: id });
        const product = await ProductModel.findOne({ _id: proId }).select('dPrice');
        if (!product) {
            const err = new Error("No Product Found. Make a valid request");
            err.statusCode = 422;
            throw err;
        }

        if (action === "PLUS") {
            if (!preCart) {
                const newCart = new CartModel({
                    userID: id,
                    products: { _id: proId, selectedColor: proColor, selectedSize: proSize, quantity: proQuan },
                    totalBill: (product.dPrice * proQuan)
                })
                await newCart.save();
                return res.status(201).json({ message: "Product Added" });
            }

            let createNew = true;

            preCart.products.map((prod, i) => {
                if (prod._id === proId && prod.selectedColor === proColor && prod.selectedSize === proSize) {
                    createNew = false;
                    preCart.products[i].quantity = prod.quantity + proQuan;
                    preCart.totalBill = preCart.totalBill + (product.dPrice * proQuan);
                }
            })
            if (createNew === true) {
                preCart.products.push({ _id: proId, selectedColor: proColor, selectedSize: proSize, quantity: proQuan });
                preCart.totalBill = preCart.totalBill + (product.dPrice * proQuan)
            }
            await preCart.save();
            return res.status(201).json({ message: "Product Added" });
        } else if (action === "MINUS") {
            if (!preCart) {
                const err = new Error("No Cart Found. Make a valid request");
                err.statusCode = 422;
                throw err;
            }
            let productFound = false;
            preCart.products.map((prod, i) => {
                if (prod._id === proId && prod.selectedColor === proColor && prod.selectedSize === proSize) {
                    productFound = true;
                    if (preCart.products.length === 1 && prod.quantity === proQuan) {
                        preCart.remove();
                    } else if (prod.quantity === proQuan) {
                        preCart.products.splice(i, i);
                        preCart.totalBill = preCart.totalBill - (product.dPrice * proQuan);
                    } else if (prod.quantity < proQuan) {
                        const err = new Error("Invalid Quantity");
                        err.statusCode = 422;
                        throw err;
                    } else {
                        preCart.products[i].quantity = prod.quantity - proQuan;
                        preCart.totalBill = preCart.totalBill - (product.dPrice * proQuan);
                    }
                }
            })

            if (productFound === false) {
                const err = new Error("Invalid Product");
                err.statusCode = 422;
                throw err;
            }

            await preCart.save()
            res.json({ message: "Deleted" })

        } else if (action === "REMOVE") {
            const proDelIndex = preCart.products.findIndex(pro => pro._id === proId && pro.selectedColor == proColor && pro.selectedSize == proSize);
            preCart.totalBill = preCart.totalBill - (product.dPrice * preCart.products[proDelIndex].quantity)
            preCart.products.splice(proDelIndex, 1);
            await preCart.save()
            res.json({ message: "Removed" })
        }
        else if (action === "DELETE") {
            if (!preCart) {
                const err = new Error("No Cart Found. Make a valid request");
                err.statusCode = 422;
                throw err;
            }
            await preCart.delete();
            res.status(200).json({ message: "Deleted" });
        } else {
            const err = new Error("Make a valid request");
            err.statusCode = 422;
            throw err;
        }
    } catch (err) {
        next(err)
    }
}

exports.getCart = async (req, res, next) => {
    try {
        const id = req.userData.userId;
        const cart = await CartModel.findOne({ userID: id }).populate('products._id', 'name dPrice price images');
        res.status(200).json({ message: "Data Featched", Cart: cart })
    } catch (err) {
        next(err)
    }

}

exports.updateInfo = async (req, res, next) => {

    const name = req.body.name;
    const dob = req.body.dob;
    const password = req.body.password;
    const rePassword = req.body.rePassword;
    const postalAddress = req.body.postalAddress;
    const address = req.body.address;
    const whatNo = req.body.whatNo;
    const No = req.body.No;


    const ValidationErr = validationResult(req);
    try {



        if (!ValidationErr.isEmpty()) {
            const err = new Error(ValidationErr);
            err.message = ValidationErr.array();
            err.statusCode = 422;
            throw err;

        }
        const user = await UserSchema.findOne({ _id: req.userData.userId });
        if (password) {
            if (!(password.trim() === rePassword.trim())) {
                const err = new Error("Password Does Not Match");
                err.statusCode = 422;
                throw err;
            }
            const cryptedPass = await bcrypt.hash(password, 10);
            user.password = cryptedPass;
        }
        user.name = name;
        user.phoneNo = No;
        user.address = address;
        user.WhatsNo=whatNo;
        user.dob = dob;
        user.PostalAddress = postalAddress;
        await user.save();
        res.status(201).json({ message: "Data Updated" })
    } catch (err) {
        next(err)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.userData.userId;
        const user = await UserSchema.findOne({ _id: userId });
        if (!user) {
            const err = new Error("No User Found");
            err.statusCode = 422;
            throw err;
        }
        res.status(200).json({ message: "Data Fetched", user })
    } catch (err) {

    }
}

exports.getOrders = async (req, res, next) => {
    const userId = req.uid;
    try {
        const orders = await OrderSchema.find({ userID: userId }).select('createdAt totalBill status');
        res.status(200).json({ message: "Data Fetched", orders })
    } catch (err) {
        next(err)
    }
}

exports.getOrder = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.userData.userId;
    try {
        const order = await OrderSchema.find({
            $and: [
                { userID: userId }, { _id: id }
            ]
        }).populate('products._id', 'dPrice images');
        res.status(200).json({ message: "Data Fetched", order })
    } catch (err) {
        next(err)
    }
}

exports.getTrackOrder = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.userData.userId;
    try {
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            const err = new Error("Enter Valid ID");
            err.statusCode = 422;
            throw err;
        }

        const order = await OrderSchema.findOne({
            $and: [
                { userID: userId }, { _id: id }
            ]
        }).select('status willReachIn');
        if (!order) {
            const err = new Error("No Order Found");
            err.statusCode = 422;
            throw err;
        }
        res.status(200).json({ message: "Data Fetched", order })
    } catch (err) {
        next(err)
    }
}

exports.getWishlist = async (req, res, next) => {
    try {
        const id = req.userData.userId;
        const wishlist = await WishListModel.findOne({ userID: id });
        const wishLists = await WishListModel.findOne({ userID: id }).populate({ path: "products._id", select: "slang name dPrice images" })
        res.status(200).json({ message: "Data Featched", wishlist: wishlist, wishLists: wishLists });
    } catch (err) {
        next(err)
    }
}

exports.postWishList = async (req, res, next) => {
    const reqErr = validationResult(req);
    const id = req.userData.userId;
    const { action, product } = req.body;
    try {
        if (!reqErr.isEmpty()) {
            const err = new Error(reqErr.errors.map(d => d.msg));
            err.statusCode = 422;
            throw err;
        }

        const preWishList = await WishListModel.findOne({ userID: id });

        const preProduct = await ProductModel.findOne({ _id: product });
        if (!preProduct) {
            const err = new Error("Make Valid Request. Product Not Found");
            err.statusCode = 422;
            throw err;
        }
        if (action === "PLUS") {
            if (preWishList) {
                let proDelIndex = preWishList.products.findIndex(pro => pro._id == product);

                if ((proDelIndex + 1)) {
                    preWishList.products.splice(proDelIndex, 1);
                    await preWishList.save()
                    res.json({ message: "Product Removed" })
                } else {
                    preWishList.products.push({ _id: product });
                    await preWishList.save();
                    return res.status(201).json({ message: "Product Added" });
                }
            } else {
                const newWishList = new WishListModel(
                    {
                        userID: id,
                        products: [{ _id: product }]
                    }
                )
                newWishList.save();
                return res.status(201).json({ message: "Product Added" });
            }
        } else if (action === "MINUS") {
            if (!preWishList) {
                const err = new Error("Make Valid Request. Wishlist Not Found");
                err.statusCode = 422;
                throw err;
            }
            const proDelIndex = preWishList.products.findIndex(pro => pro._id === product);
            if (!(proDelIndex + 1)) {
                const err = new Error("Product Already Deleted");
                err.statusCode = 422;
                throw err;
            }
            preWishList.products.splice(proDelIndex, 1);
            await preWishList.save()
            res.json({ message: "Removed" })
        } else {

        }
    } catch (err) {
        next(err)
    }
}

exports.postOrder = async (req, res, next) => {
    try {
        const userID = req.userData.userId;
        const cart = await CartModel.findOne({ userID: userID });
        if (!cart) {
            const err = new Error("No Cart Found");
            err.statusCode = 422;
            throw err;
        }
        if (cart.products.length === 0) {
            const err = new Error("No Product Found");
            err.statusCode = 422;
            throw err;
        }
        const newOrder = new OrderSchema({
            userID: userID,
            products: cart.products,
            subTotalItems: cart.totalBill,
            totalBill: (cart.totalBill + 10)
        })
        const order = await newOrder.save();
        cart.products = [];
        cart.totalBill = 0;
        await cart.save();
        res.status(201).json({ message: "Order Created", orderId: order._id })
    } catch (err) {
        next(err);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const userID = req.userData.userId;
        const orders = await OrderSchema.find({ userID: userID }).select("createdAt totalBill status");
        res.status(200).json({ messgae: "Orders Fetched", orders });
    } catch (err) {
        next(err)
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        let orderId = req.params.id;


        if (mongoose.Types.ObjectId.isValid(orderId) === false) {
            const err = new Error("Make Valid Request");
            err.statusCode = 400;
            throw err;
        }
        const userID = req.userData.userId;

        const order = await OrderSchema.findOne({ userID: userID, _id: orderId }).select("products status").populate({ path: "products._id" });
        if (!order) {
            const err = new Error("Make Valid Request");
            err.statusCode = 422;
            throw err;
        }
        res.status(200).json({ messgae: "Order Fetched", order });
    } catch (err) {
        next(err)
    }
}

exports.getPaymentLink = async (req, res, next) => {
    try {
        const OrderID = req.params.id;
        if (!OrderID) {
            const err = new Error("Make Valid Request");
            err.statusCode = 422;
            throw err;
        }
        const order = await OrderSchema.findById(OrderID).select("totalBill");
        if (!order) {
            const err = new Error("Make Valid Request");
            err.statusCode = 422;
            throw err;
        }
        const bill = order.totalBill;
        const safepay = new Safepay({
            environment: 'sandbox',
            apiKey: process.env.SAFEPAY_API_KEY,
            v1Secret: process.env.vSecret,
            webhookSecret: process.env.WEB_HOOK_SECRET
        })

        const { token } = await safepay.payments.create({
            amount: bill,
            currency: "USD"
        })

        const url = safepay.checkout.create({
            token,
            orderId: order._id,
            cancelUrl: `http://${process.env.FRONTEND}/user/checkout/${order._id}`,
            redirectUrl: `http://${process.env.FRONTEND}/user/thanks`,
            source: 'custom',
            webhooks: true
        })
        res.status(200).json({ message: "Link Created", url })
    } catch (err) {
        next(err)
    }
}