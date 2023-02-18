const express = require("express");
const { body } = require("express-validator")
const HooksController = require('../controllers/hooks');

const router = express.Router();

router.post('/verifyPayment',HooksController.verifyPayment)

module.exports = router;