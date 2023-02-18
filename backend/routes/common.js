const express = require("express");
const { body } = require("express-validator");

const CommonController = require('../controllers/common');

const router = express.Router();


//Creating Dummy Things
router.get('/dummy', CommonController.getDummy)


//Get Category
router.get('/categories', CommonController.getCategories);

//Products Routes
router.get('/featuredProducts', CommonController.getFeaturedProducts)
router.get('/products', CommonController.getProducts)
router.get('/products/:search', CommonController.getSearchedProducts);
router.get('/category/:search', CommonController.getCategorySearch);
router.get('/product/:slang', CommonController.getProduct);
router.get('/paths', CommonController.getAllProductsPaths);

//Post Query and Newsletter

router.post('/query',
    body('email', "Enter Valid Email").isEmail(),
    body('name', "Name is Required").notEmpty(),
    body('query', "Message cannot be less than 20 characters").isLength({ min: 20 }),
    CommonController.postQuery
)

router.post('/newsletter', body('email', "Enter Valid Email").isEmail(), CommonController.postNewsLetter)

//App Data

router.get('/appData', CommonController.getAppData)

module.exports = router;

