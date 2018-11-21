const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    full_name: {
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    image:{
        type:String
    },
    phone_number:{
        type:String,
        required:true,
        unique: true ,
        index: true
    },
    address:{
        type:String
    },
    lat:{
        type:Number
    },
    lng:{
        type:Number
    },
    createAt:{
        type:Date,
        default: new Date()
    },
    city:{
        type:String
    },
    verify_code:{
        type:String
    },
    isVerify:{
        type:Boolean,
        default: false
    },
    isBlock:{
        type:Boolean,
        default: false
    },
    token:{
        type:String
    }
}, { versionKey: false });

const Users = mongoose.model('Users',UserSchema);

function validateUsers(u) {
    const schema = {
      phone_number: Joi.string().required()
    };
    return Joi.validate(u, schema);
}

exports.Users = Users; 
exports.validateUsers = validateUsers;