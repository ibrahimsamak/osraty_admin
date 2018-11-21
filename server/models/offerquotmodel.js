const Joi = require('joi');
const mongoose = require('mongoose');

const Quotschema = mongoose.Schema({
    supplier_id:{
        type : mongoose.Schema.Types.ObjectId, ref: 'Supplier',
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    product_id:{
        type : mongoose.Schema.Types.ObjectId, ref: 'Product',
        required:true
    }
}, { versionKey: false });

const OfferQuot = mongoose.model('OfferQuot',Quotschema);

function validateQuot(c) {
    const schema = {
        new_price:  Joi.string().required(),
        qty:        Joi.string().required(),
        product:    Joi.number().required()
    };
    return Joi.validate(c, schema);
}

exports.OfferQuot = OfferQuot; 
exports.validateQuot = validateQuot;