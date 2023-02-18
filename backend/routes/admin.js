const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const ProductModel = require('../models/Product');

const AdminController = require('../controllers/admin');


const router = express.Router();

//Multer Config
const storage = multer.diskStorage({
    destination: async (req, file, callback) => {
        const slang = req.body.slang;
        const dir = path.join(__dirname, `../uploads/products/${slang}`)
        try {
            fs.mkdirSync(dir, { recursive: true })
        } catch (err) {

        }
        callback(null, dir)
    },
    filename: async (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const uploads = multer({ storage: storage });

//Newsletters

router.get('/newsletters', AdminController.getNewsLetter);
router.delete('/newsletter/:id', AdminController.deleteNewsLetter);

//Users
router.get('/users', AdminController.getUsers)
router.delete('/user/:id', AdminController.deleteUser)

//Categories
router.post('/category', AdminController.postCategory)
router.get('/categories', AdminController.getCategories)
router.put('/category', AdminController.putCategory)
router.delete('/category/:id', AdminController.deleteCategories)

//Query

router.get('/query', AdminController.getQuery);
router.delete('/query/:id', AdminController.deleteQuery);

//CMS

router.get('/cms', AdminController.getCMS);
router.put('/cms', AdminController.putCMS);

//Orders

router.get('/orders', AdminController.getOrders);
router.get('/order/:id', AdminController.getOrder);
router.put('/order/:id', AdminController.putOrder)
router.delete('/order/:id', AdminController.deleteOrder)
//Products

router.get('/products', AdminController.getProducts);
router.get('/product/:id', AdminController.getProduct);
router.post('/product',
    uploads.array("images"),
    // (req, res, next) => {
    //     uploads(req, res, function (err) {
    //         if (err instanceof multer.MulterError) {
    //             next(err)
    //         } else if (err) {
    //             next(err)
    //         }
    //     })
    // },
    AdminController.postProduct)
router.delete('/product/:id', AdminController.deleteProduct);

module.exports = router;