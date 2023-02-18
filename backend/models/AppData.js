const mongoose = require('mongoose');

const schema = mongoose.Schema;


const AppDataSchema = new schema(
    {
        _id: Number,
        upperLine: {
            type: String,
            required: true
        },
        deliveryCharges: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('AppData', AppDataSchema);