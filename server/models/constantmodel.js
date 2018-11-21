const Joi = require('joi');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type:String,
        required:true
    }
  }, { versionKey: false });

const Delivry = mongoose.model('Delivry',schema);
const BuyUnits = mongoose.model('Buyunits',schema);
const DeliveryOption = mongoose.model('Deliveryoption',schema);
const BuyOption = mongoose.model('Buyoption',schema);

const Socialschema = mongoose.Schema({
  name: {
      type:String,
      required:true
  },
  data: {
    type:String
  }
}, { versionKey: false });

const SocialOption = mongoose.model('SocialOption',Socialschema);
const ContactOption = mongoose.model('ContactOption',Socialschema);

const StaticPageSchema = mongoose.Schema({
  title: {
      type:String,
      required:true
  },
  content: {
    type:String
  }
}, { versionKey: false });
const StaticPage = mongoose.model('StaticPage',StaticPageSchema);


function validateCustomer(customer) {
  const schema = {
    name: Joi.required(),
  };
  
  return Joi.validate(customer, schema);
}

exports.Delivry = Delivry; 
exports.BuyUnits = BuyUnits; 
exports.DeliveryOption = DeliveryOption; 
exports.BuyOption = BuyOption;
exports.ContactOption = ContactOption;
exports.SocialOption = SocialOption;
exports.StaticPage = StaticPage;
exports.validate = validateCustomer;