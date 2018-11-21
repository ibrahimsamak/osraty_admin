const Joi = require('joi');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const subCategorySchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required:true
    }
}, { versionKey: false });

const Supplierschema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    details:{
        type:String
    }
});

const Productschema = mongoose.Schema({
    name:{
        type:String,
    },
    images:{
        type: [String]
    },
    details:{
        type:String
    },
    image:{
        type:String,
    },
    barcode:{
        type:String,
    },
    createat:{
        type:Date
    },
    supplierno:{
        type: Number,
    },
    made_country:{
        type:String,
    },
    category_id:{
         type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
    },
    sub_category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' 
   }
}, { versionKey: false });

const Category = mongoose.model('Category',schema);
const SubCategory = mongoose.model('SubCategory',subCategorySchema);
const Supplier = mongoose.model('Supplier',Supplierschema);
const Product = mongoose.model('Product',Productschema);

function validateSubCategory(_Subcategory) {
    const schema = {
      name: Joi.string().required(),
      category_id: Joi.string().required()
    };
    return Joi.validate(_Subcategory, schema);
}

function validateCategory(_category) {
  const schema = {
    name: Joi.string().required(),
    image: Joi.string().required()
  };
  return Joi.validate(_category, schema);
}

function validateSupplier(_supplier) {
    const schema = {
      name: Joi.string().required(),
      image: Joi.string().required(),
      details: Joi.string()
    };
    return Joi.validate(_supplier, schema);
}

function validateProduct(_product) {
    const schema = {
      name:         Joi.string().required(),
      details:      Joi.string(),
      made_country: Joi.string().required(),
      supplierno:   Joi.number().required(),
      barcode:      Joi.string().required(),
      images:       Joi.array().required(),
      category_id:  Joi.array().required()
    };
    return Joi.validate(_product, schema);
}


exports.Category = Category; 
exports.SubCategory = SubCategory; 
exports.Supplier = Supplier; 
exports.Product = Product;
exports.validateSubCategory = validateSubCategory
exports.validateCategory = validateCategory;
exports.validateProduct = validateProduct
exports.validateSupplier = validateSupplier;