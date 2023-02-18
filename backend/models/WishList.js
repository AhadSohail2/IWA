const mongoose = require('mongoose');

const schema = mongoose.Schema;


const WishListSchema = new schema(
    {
        userID: {
            type: String,
            ref: "User",
            required: true
        },
        products: [
            {
                _id: {
                    type: Number,
                    ref: "Product"
                }
            }
        ]
    }
)

module.exports = mongoose.model('WishList', WishListSchema);