const mongoose = require('mongoose');

const schema = mongoose.Schema;


const QuerySchema = new schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        query: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Query', QuerySchema);