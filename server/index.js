/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');


const app= express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(function(req,res,next) {
    res.header("Content-type", "application/json;charset=UTF-8")
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept'
    )
    next()
})

app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connect to the MongoDB server
mongoose.connect('mongodb+srv://ddesai21:Devanshu15@cluster0.xuryuj3.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000, () => console.log("Server running on port 3000"));

