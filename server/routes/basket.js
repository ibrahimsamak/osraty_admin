
const express = require('express');
const _ = require('underscore');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const { Basket , validateBasket } = require('../models/basketmodel');
const {Product} = require('../models/categorymodel');

const response = {
    status_code: '',
    message: '',
    items: [],
    pagatination: []
}

router.get('/', (req, res) => {
    res.send('works')
});

//#region basket 
router.get('/basket', async (req, res) => {
    await Basket.find().sort({ _id: -1 })
    .populate('supplier_id')
    .populate({path:'products.product_id',populate : {path : 'product_id'}})
    .exec(function (err, item) {
        if (err) return handleError(err); 
        const response = {
            status_code: 200,
            status: true,
            message: 'return succssfully',
            items: item,
            pagatination: []
        }
        res.json(response);
    });
});

router.post('/basket', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
   
    let Baskets = new Basket({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        supplier_id: req.body.supplier_id,
        products: req.body.products,
        createAt : new Date()      
    });

    let rs = await Baskets.save();
    res.send(rs);
});

router.put('/basket/:id', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const sp = await Basket.findByIdAndUpdate((req.params.id), {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        supplier_id: req.body.supplier_id,
        products: req.body.products
    }, { new: true })

    if (!sp) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(sp);
});

router.delete('/basket/:id', async (req, res) => {
    const sp = await Basket.findByIdAndRemove(req.params.id);
    if (!sp) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(sp);
});

router.get('/basket/:id', async (req, res) => {
    const sp = await Basket.findById(req.params.id);
    if (!sp){
        const response = {
            status_code: 400,
            status: true,
            message: 'item not found',
            items: [],
            pagatination: []
        }
        return res.json(response);
    }
    
    await Basket.findById(req.params.id)
    .populate('supplier_id')
    .populate({path:'products.product_id', populate: {path : 'product_id'}})
    .exec(function (err, item) {
        if (err) return handleError(err);
        const response = {
            status_code: 200,
            status: true,
            message: 'return succssfully',
            items: item,
            pagatination: []
        }
        res.json(response);
    });
});
//#endregion

module.exports = router;