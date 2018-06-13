const {mongoose} = require('../db');

var {Product} = require('../models/product.js');

var products = [
    new Product({
        imagepath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title:'Gothic German Game',
        description:'Awesome game!',
        price:10
    }),
    new Product({
        imagepath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title:'Gothic German Game',
        description:'Awesome game!',
        price:10
    }),
    new Product({
        imagepath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title:'Gothic German Game',
        description:'Awesome game!',
        price:10
    })
    
];

for(var i=0;i<products.length;i++){
    products[i].save((err,docs)=>{
        if(err){console.log('Error in Employee Save'+JSON.stringify(err,undefined,2));}
        if(!err){
            if(i==products.length){
                exit();
            }
        }
    });
}
function exit(){
    mongoose.disconnect();
}

