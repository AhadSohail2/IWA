const mongoose = require('mongoose');

const schema = mongoose.Schema;


const NewsLetterSchema = new schema(
    {
        email: {
            type: String,
            required: true,
            unique:true
        }
    }
)

module.exports = mongoose.model('NewsLetter', NewsLetterSchema);