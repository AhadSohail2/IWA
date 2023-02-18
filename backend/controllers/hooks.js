const OrderSchema = require('../models/Order');
const { Safepay } = require('@sfpy/node-sdk');

exports.verifyPayment = async (req, res, next) => {
    try {
        const safepay = new Safepay({
            environment: 'sandbox',
            apiKey: process.env.SAFEPAY_API_KEY,
            v1Secret: process.env.vSecret,
            webhookSecret: process.env.WEB_HOOK_SECRET
        })
        const valid = safepay.verify.webhook(req)
        console.log(valid)
        if (valid) {
            const orderId = req.body.data.notification.metadata.order_id;
            const order = await OrderSchema.findById(orderId);
            order.status="Payment Completed";
            await order.save();
        }
    } catch (err) {
        next(err)
    }

}