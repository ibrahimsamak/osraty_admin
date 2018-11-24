const Joi = require('joi');
const mongoose = require('mongoose');


const SupplierProductschema = mongoose.Schema({
    supplier_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' 
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
    },
    sub_category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' 
    },
    product_id: {type : mongoose.Schema.Types.ObjectId, ref: 'Product'}, 
    prices:{
        type: [{
            buy_unit_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Buyunits'}, 
            buy_unit_name:{type: String}, 
            price:{type: Number}
        }]
    },
    qty:{type:Number},
    dt_end:{type:Date},
    rate:{type:Number}
}, { versionKey: false });

const SupplierProduct = mongoose.model('SupplierProduct',SupplierProductschema);

function validateProduct(p) {
    const schema = {
      supplier_id:  Joi.object().required(),
      category_id:  Joi.object().required(),
      sub_category_id:  Joi.object().required(),
      products:     Joi.object().required()
    };
    return Joi.validate(p, schema);
}


exports.SupplierProduct = SupplierProduct; 
exports.validateProduct = validateProduct;