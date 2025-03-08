const mongoose = require('mongoose');

const Books = new mongoose.Schema({
    name: String,
    author:String,
    year:String,
    
})

module.exports = mongoose.model('book',Books);