const express = require("express");
const { body } = require("express-validator");

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/dummy', UserController.getDummy);

router.get('/cart', UserController.getCart);

router.post('/cart',
    body('proId', "Please Make Valid Request").notEmpty(),
    body('proColor', "Please Make Valid Request").notEmpty(),
    body('proSize', "Please Make Valid Request").notEmpty(),
    body('proQuan', "Please Make Valid Request").notEmpty(),
    body('action', "Please Make Valid Request").notEmpty(),
    UserController.postCart);

router.put('/updateInfo',
    body('name', "Enter Valid Name").notEmpty(),
    body('dob', "Enter Valid DOB").isDate(),
    body('postalAddress', "Enter Valid PostalAddress").isPostalCode("any"),
    body('address', "Enter Valid Address").isLength({ min: 10 }),
    body('whatNo', "Enter Valid Whatsapp No").isMobilePhone(),
    body('No', "Enter Valid Phone No").isMobilePhone()
    , UserController.updateInfo)

router.get('/getUser', UserController.getUser);

router.get('/orders', UserController.getOrders);

router.get('/order/:id', UserController.getOrder)

router.get('/trackOrder/:id', UserController.getTrackOrder)

router.post('/wishlist',
    body('product', "Make Valid Request"),
    body('action', "Make Valid Request"),
    UserController.postWishList
)

router.get('/wishlist', UserController.getWishlist);

router.post('/order', UserController.postOrder);
router.get('/orders', UserController.getOrders);
router.get('/order/:id', UserController.getOrder);

//Payment

router.get('/getPaymentLink/:id', UserController.getPaymentLink);

module.exports = router;

