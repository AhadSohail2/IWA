const mongoose = require('mongoose');

const schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const UserSchema = new schema(
    {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        dob: {
            type: Date
        },
        PostalAddress: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        WhatsNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema);