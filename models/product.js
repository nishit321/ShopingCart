const mongoose = require('mongoose');
var Product = mongoose.model('products',{
    imagepath:{type:String},
    title:{type:String},
    description:{type:String},
    price:{type:Number}
});

module.exports = {Product};