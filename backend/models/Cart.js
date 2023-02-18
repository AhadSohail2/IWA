const mongoose = require('mongoose');

const schema = mongoose.Schema;


const CartSchema = new schema(
    {
        userID: {
            type: String,
            required: true,
            unique: true
        },
        products: [
            {
                _id: {
                    type: Number,
                    ref: "Product"
                },
                selectedColor: String,
                selectedSize: String,
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalBill: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Cart', CartSchema);