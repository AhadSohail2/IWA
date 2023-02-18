const mongoose = require('mongoose');

const schema = mongoose.Schema;


const ProductSchema = new schema(
    {
        _id: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            required: true
        }
        ,
        slang: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        colors: [
            {
                color: {
                    type: String, required: true
                }
            }
        ],
        sizes: [
            {
                tag: {
                    type: String, required: true
                }
            }
        ],
        description: {
            type: String,
            required: true
        },
        isFeatured: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        dPrice: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        sales: {
            type: Number
        },
        tags: {
            type: Array,
            required: true
        },
        images: [
            {
                url: {
                    type: String,
                    required: true
                },
                alt: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema);