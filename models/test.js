const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const x = new Schema({
  url: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    required: true
  }
}, {timestamps: true})

const Url = mongoose.model('veds', x)

module.exports = Url