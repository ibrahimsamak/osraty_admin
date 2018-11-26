const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const multer = require('multer');
const auth = require('../models/auth');
const mongoose = require('mongoose');
const fs = require('fs');
const router = express.Router();
const { Users, validateUsers } = require('../models/usermode');

var upload = multer({ dest: './dist/assets/uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/assets/uploads/')
    },
    filename: function (req, file, cb) {
        var ext = require('path').extname(file.originalname);
        ext = ext.length > 1 ? ext : "." + require('mime').extension(file.mimetype);
        require('crypto').pseudoRandomBytes(16, function (err, raw) {
            cb(null, (err ? undefined : raw.toString('hex')) + ext);
        });
    }
});

var upload = multer({ storage: storage });
router.post('/user/file_upload', upload.any(), function (req, res) {
    res.json({ filename: req.files });
})

//#region Users 
router.post('/add', async (req, res) => {
    // const { error } = validateUsers(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const _user = await Users.findOne({phone_number: req.body.phone_number});
    if(_user)
    {
        const response = {
            status_code: 200,
            status: true,
            message: 'return succssfully',
            items: _user
        }
        res.json(response);
    }
    else{
        if(_user.isBlock){
            const response = {
                status_code: 400,
                status: false,
                message: 'تم حظر المستخدم من قبل الادارة',
                items: []
            }
            res.json(response);
        }
        else{
            let user = new Users({
                phone_number: req.body.phone_number,
                verify_code: 1234,
                full_name: '',
                email: '',
                image:'',
                address: '',
                lat : req.body.lat,
                lng : req.body.lng,
                createAt : new Date(),
                city : req.body.city,
                isVerify: false,
                isBlock: false,
                wallet:0
            });
            let rs = await user.save();
    
            const response = {
                status_code: 200,
                status: true,
                message: 'return succssfully',
                items: rs
            }
            res.json(response);
        }
    }
});

router.put('/verify', async (req, res) => {
    // const { error } = validateAdv(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const _user = await Users.findOne({_id:req.body.id}).select('verify_code');
    console.log(_user);

    if(_user.verify_code === req.body.verify_code){
        const user = await Users.findByIdAndUpdate((req.body.id), {
            isVerify :  true,
            token : jwt.sign({_id:req.body.id}, config.get('jwtPrivateKey'))
        }, { new: true })
        
        if (!user){
           const response = {
                status_code: 404,
                status: false,
                message: 'حدث خطأ الرجاء المحاولة مرة اخرى',
                items: []
            }
            res.json(response);
        }
        else{
            const response = {
                status_code: 200,
                status: true,
                message: '',
                items: user
            }
            res.json(response);
        }
    }
    else{
        const response = {
            status_code: 404,
            status: false,
            message: 'خطأ!! في رقم التفعيل',
            items: []
        }
        res.json(response);
    }
});

router.put('/updateprofile',upload.any(),async (req, res) => {
    // const { error } = validateAdv(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    if(req.files.length > 0){
        const user = await Users.findByIdAndUpdate((req.body.id), {
            email: req.body.email,
            image: req.files[0].filename,
            address: req.body.address,
            city : req.body.city
        }, { new: true }) 
        if (!user){
            const response = {
                status_code: 404,
                status: false,
                message: 'حدث خطأ الرجاء المحاولة مرة اخرى',
                items: []
            }
            res.json(response);
        } 
        else{
            const  response = {
                status_code: 200,
                status: true,
                message: '',
                items: user
            }
            res.json(response);
        }
    }
    else{
        const user = await Users.findByIdAndUpdate((req.body.id), {
            email: req.body.email,
            address: req.body.address,
            city : req.body.city
        }, { new: true })
    
        if (!user){
            const response = {
                status_code: 404,
                status: false,
                message: 'حدث خطأ الرجاء المحاولة مرة اخرى',
                items: []
            }
            res.json(response);
        }else{
            const response = {
                status_code: 200,
                status: true,
                message: 'تم تعديل الملف الشخصي',
                items: user
            }
            res.json(response);
        }
    }

});

router.get('/userslist' ,async (req, res) => {
    const Advs = await Users.find().sort({ createAt: -1 });
    res.send(Advs);
});

router.put('/block/:id', async (req, res) => {
    const user = await Users.findByIdAndUpdate((req.params.id), {
        isBlock : req.body.isBlock
    }, { new: true })

    if (!user) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(user);
});


router.put('/wallet/:id', auth ,async (req, res) => {
    const user = await Users.findByIdAndUpdate((req.params.id), {
        wallet : req.body.wallet
    }, { new: true })

    if (!user) {
        const response = {
            status_code: 404,
            status: true,
            message: 'حدث خطأ الرجاء المحاولة مرة اخرى',
            items: user
        }
        res.json(response);
    }
    else{
        const response = {
            status_code: 200,
            status: true,
            message: 'تم شحن المحفظة بنجاح',
            items: user
        }
        res.json(response);
    } 
});


router.get('/userprofile/:id', auth ,async (req, res) => {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send('The given ID was not found.');
   
    const response = {
        status_code: 200,
        status: true,
        message: '',
        items: user
    }

    res.json(response);
});
//#endregion

module.exports = router;