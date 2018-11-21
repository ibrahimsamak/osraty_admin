const Joi = require('joi');
const mongoose = require('mongoose');

const Basketschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    supplier_id:{
        type : mongoose.Schema.Types.ObjectId, ref: 'Supplier',
        required:true
    },
    products:{
        type:[{product_id:{type : mongoose.Schema.Types.ObjectId, ref: 'Product'}, qty:{type:Number}}]
    },
    createAt:{
        type:Date , default: new Date()
    }
}, { versionKey: false });

const Basket = mongoose.model('Basket',Basketschema);

function validateBasket(c) {
    const schema = {
      name: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      supplier_id: Joi.string().required(),
      image: Joi.string().required()
    };
    return Joi.validate(c, schema);
}

exports.Basket = Basket; 
exports.validateBasket = validateBasket;