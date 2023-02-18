const express = require('express');

const bcrypt = require('bcryptjs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
var cors = require('cors')

const UserSchema = require('./models/Users')

const CommonRoutes = require('./routes/common');
const UserRoutes = require('./routes/user');
const AdminRoutes = require('./routes/admin');
const AuthRoutes = require('./routes/auth');
const HooksRoutes = require('./routes/hooks');
const checkAuth = require('./middlewares/check-auth');
const checkAdminAuth = require('./middlewares/check-admin-auth');

const app = express();

app.use(bodyParser.json());
config();

//Staic
app.use('/static', express.static(path.join(__dirname, "uploads")));
//CORS ERROR
app.use(cors())
//Creating Dummy User
app.use(async (req, res, next) => {
    try {
        const user = await UserSchema.findById('ahadsohail4@gmail.com');
        if (!user) {
            const newUser = new UserSchema({
                _id: "ahadsohail4@gmail.com",
                name: "Ahad Sohail",
                password: await bcrypt.hash("AhadSohail2006", 10),
                phoneNo: "+923034627821",
                WhatsNo: "+923470555428",
                address: "Sector 3 325 Canal View Gujranwala",
                dob: "1995-06-22",
                role: "Admin",
                PostalAddress: "552532"
            })
            await newUser.save();
        }
        next();
    } catch (err) {
        console.log(err)
    }
})


//All Routes
app.use(CommonRoutes);
app.use('/hooks', HooksRoutes);

//Payment Integration

app.use('/user', checkAuth, UserRoutes);
app.use('/admin', checkAdminAuth, AdminRoutes);
app.use('/auth', AuthRoutes);


//Error Handling
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message })
})


mongoose.connect('mongodb://0.0.0.0:27017/IWA').then(
    () => {
        app.listen(8080)
    }
)
    .catch((err) => {
        console.log(err);
    })
