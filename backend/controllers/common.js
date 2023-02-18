const { validationResult } = require('express-validator');

const CategoryModel = require('../models/Category');
const ProductModel = require('../models/Product');
const QueryModel = require('../models/Quries');
const NewsLetterModel = require('../models/Newsletter');
const AppDataModel = require('../models/AppData');

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
};

exports.getDummy = async (req, res, next) => {
    // const newProduct = new ProductModel({
    //     _id: 2,
    //     name: "Pure Leather Dummy Product 2",
    //     category: "639b0ffc50e2aa1babfa9c80",
    //     colors: [{ color: '#000000' }, { color: '#454523' }, { color: '#023043' }, { color: '#023452' }],
    //     description: "<Fragment> <p>& nbsp;</p> <h2>Why This Product</h2 > <ul> <li><strong>Lorem Ipsum</strong></li> <li><strong>Lorem Ipsum</strong></li> <li><strong>Lorem Ipsum</strong></li> </ul > <br></br> <h3>Features</h3> <p>Lorem Ipsum is dummied text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> <br /> <h3>Warranty</h3> <p> It has survived five centuries and the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /> </p> <br></br> </Fragment >",
    //     price: 500,
    //     dPrice: 200,
    //     isFeatured: false,
    //     images: [{ url: "/products/1.jpg", alt: "Leather Product" }, { url: "/products/2.jpg", alt: "Leather Product" }, { url: "/products/3.webp", alt: "Leather Product" }, { url: "/products/1.jpg", alt: "Leather Product" }],
    //     slang: "pure-leather-dummy-product-2",
    //     sizes: [{ tag: 'S' }, { tag: 'M' }, { tag: 'L' }, { tag: 'XL' }],
    //     tags: ['pure', 'leather', 'dummy', 'product']
    // })
    const newProduct = new AppDataModel({
        _id: 1,
        upperLine: "Sale Is Live Now",
        deliveryCharges: 10
    })
    await newProduct.save();
    res.json({ message: "Created" })
}

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({ message: "Data Fetched", data: categories });
    } catch (err) {
        next(err);
    }
}

exports.getProducts = async (req, res, next) => {

    const productPerPage = req.body.productPerPage || 9;
    const currentPage = req.body.currentPage || 0;

    try {
        const totalProducts = (await ProductModel.find()).length;

        const totalPages = Math.round(totalProducts / productPerPage);

        const products = await ProductModel.find().skip(productPerPage * currentPage).limit(productPerPage)
            .populate('category')
            .select('name images name slang dPrice price category');
        res.status(200).json({ message: "Fetched", data: products, totalPages: totalPages });
    } catch (err) {
        next(err)
    }
}

exports.getAllProductsPaths = async (req, res, next) => {

    try {
        const paths = await ProductModel.find()
            .select('slang');
        res.status(200).json({ message: "Fetched", data: paths });
    } catch (err) {
        next(err)
    }
}

exports.getSearchedProducts = async (req, res, next) => {

    const productPerPage = req.body.productPerPage || 9;
    const currentPage = req.body.currentPage || 0;
    const search = req.params.search.toLowerCase();

    try {
        const totalProducts = (await ProductModel.find()).length;

        const totalPages = Math.round(totalProducts / productPerPage);

        const products = await ProductModel.find(
            {
                $or: [
                    { name: new RegExp(search, 'i') },
                    { description: new RegExp(search, 'i') },
                    { slang: new RegExp(search, 'i') },
                    { 'category.name': new RegExp(search, 'i') },
                    { tags: new RegExp(search, 'i') }
                ]
            }
        )
            .populate('category')
            .skip(productPerPage * currentPage).limit(productPerPage)
            .select('name images name slang dPrice price category');
        res.status(200).json({ message: "Fetched", data: products, totalPages: totalPages });
    } catch (err) {
        next(err)
    }
}

exports.getCategorySearch = async (req, res, next) => {

    const productPerPage = req.body.productPerPage || 9;
    const currentPage = req.body.currentPage || 0;
    const search = req.params.search;

    try {
        const totalProducts = (await ProductModel.find()).length;


        const totalPages = Math.round(totalProducts / productPerPage);

        const category = await CategoryModel.findOne({ name: search });

        if (!category) {
            return res.status(200).json({ message: "Fetched", data: [], totalPages: totalPages });
        }

        const products = await ProductModel.find(
            {
                category: category._id
            }
        )
            .populate('category')
            .skip(productPerPage * currentPage).limit(productPerPage)
            .select('name images name slang dPrice price category');
        res.status(200).json({ message: "Fetched", data: products, totalPages: totalPages });
    } catch (err) {
        next(err)
    }
}

exports.getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({ isFeatured: true })
            .populate('category')
            .select('name images name slang dPrice price category');
        res.status(200).json({ message: "Fetched", data: products });
    } catch (err) {
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    const slang = req.params.slang;

    try {
        const product = await ProductModel.findOne({ slang: slang }).populate('category');
        res.status(200).json({ message: "Data Fetched", data: product });

    } catch (err) {
        next(err)
    }
}

exports.postQuery = async (req, res, next) => {
    const { email, name, query } = req.body;

    const ValidationErr = validationResult(req).formatWith(errorFormatter);
    try {
        if (!ValidationErr.isEmpty()) {
            const err = new Error(ValidationErr);
            err.message = ValidationErr.array();
            err.statusCode = 422;
            throw err;
        }

        const newQuery = new QueryModel({
            name: name,
            email: email,
            query: query
        })

        await newQuery.save();

        res.status(201).json({ message: "Query Submitted" })

    } catch (err) {
        next(err)
    }



}

exports.postNewsLetter = async (req, res, next) => {
    const { email } = req.body;

    const ValidationErr = validationResult(req).formatWith(errorFormatter);
    try {
        if (!ValidationErr.isEmpty()) {
            const err = new Error(ValidationErr);
            err.message = ValidationErr.array();
            err.statusCode = 422;
            throw err;
        }

        const preNewsletter = await NewsLetterModel.find({ email: email });

        if (preNewsletter.length === 0) {
            const newNewsLetter = new NewsLetterModel({
                email: email
            })

            await newNewsLetter.save();
            res.status(201).json({ message: "Newsletter Submitted" })
        } else {
            res.status(422).json({ message: "Email Already Registered" });
        }

    } catch (err) {
        next(err)
    }
}

exports.getAppData = async (req, res, next) => {
    try {
        const appData = await AppDataModel.findOne({ _id: 1 });
        res.status(200).json({ message: "Data Fetched", data: appData });

    } catch (err) {
        next(err)
    }
}