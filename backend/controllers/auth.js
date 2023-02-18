const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const UserModel = require('../models/Users');
const CartModel = require('../models/Cart');
const WishListModel = require('../models/WishList');

exports.signUp = async (req, res, next) => {
    const reqErr = validationResult(req);
    const { name, email, password, rePassword, phoneNo, whatsappNo, dob, add, posAdd } = req.body;
    let hashedPassword;
    try {
        if (!reqErr.isEmpty()) {
            const err = new Error(reqErr.errors.map(d => d.msg));
            err.statusCode = 422;
            throw err;
        }
        if (!(password.trim() === rePassword.trim())) {
            const err = new Error("Password DoesNot Match");
            err.statusCode = 422;
            throw err;
        }
        const existingUser = await UserModel.findOne({ _id: email });
        if (existingUser) {
            const err = new Error("User Exists Please Login");
            err.statusCode = 422;
            throw err;
        }

        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            const error = new Error('Try Again. Something Went Wront')
            throw error;
        }

        try {
            const newUser = new UserModel({
                _id: email,
                address: add,
                name: name,
                password: hashedPassword,
                phoneNo: phoneNo,
                PostalAddress: posAdd,
                role: "User",
                WhatsNo: whatsappNo,
                dob: dob
            })
            const user = await newUser.save();
            const newCart = new CartModel({
                userID: user._id,
                products: [],
                totalBill: 0
            })
            const newWishList = new WishListModel({
                userID:user._id,
                products:[]
            })
            await newCart.save();
            await newWishList.save();
            var token = jwt.sign({ name: user.name, id: user._id, role: user.role }, process.env.JWTKEY, { expiresIn: "10 days" });
            res.status(201).json({ message: "User Created", data: { name: user.name, id: user.id, role: user.role, token: token } })
        } catch (err) {
            throw new Error("Something Went Wrong Try Again");
        }

    } catch (err) {
        next(err);
    }




}
exports.signIn = async (req, res, next) => {
    const reqErr = validationResult(req);
    const { email, password } = req.body;
    try {

        if (!reqErr.isEmpty()) {
            const err = new Error(reqErr.errors.map(d => d.msg));
            err.statusCode = 422;
            throw err;
        }

        const user = await UserModel.findOne({ _id: email });
        if (!user) {
            const err = new Error("Invalid Email");
            err.statusCode = 422;
            throw err;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const err = new Error("Invalid Password");
            err.statusCode = 422;
            throw err;
        }
        try {
            var token = jwt.sign({ name: user.name, id: user._id, role: user.role }, process.env.JWTKEY, { expiresIn: "10 days" });
            res.status(200).json({ message: "User Authenticated", data: { name: user.name, id: user.id, role: user.role, token: token } })
        } catch (err) {
            throw new Error("Something Went Wrong Try Again");
        }

    } catch (err) {
        next(err);
    }
}