const mongoose = require('mongoose');

const schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const OrderSchema = new schema(
    {
        userID: {
            type: String,
            required: true,
            ref: "User"
        },
        status: {
            type: String,
            default: "Payment Pending",
            required: true
        },
        willReachIn: {
            type: String,
            required: true,
            default: "Neither To Say"
        },
        products: [
            {
                _id: {
                    type: Number,
                    ref: 'Product'
                },
                selectedColor: String,
                selectedSize: String,
                quantity: Number
            }
        ],
        subTotalItems: {
            type: Number,
            required: true
        },
        delivery: {
            type: Number,
            default: 10
        },
        totalBill: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema);