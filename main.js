const express = require('express');
const mongoose = require('mongoose')

const app = express();

const uri = '';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, options)
.then(() => console.log("connected"))
.catch(err => console.log(err))