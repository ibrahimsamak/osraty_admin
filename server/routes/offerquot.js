
const express = require('express');
const _ = require('underscore');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const {OfferQuot, validateQuot} = require('../models/offerquotmodel');

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
router.get('/quota', async (req, res) => {
    await OfferQuot.find().sort({ _id: -1 })
    .populate({path:'product_id',populate : {path : 'product_id'}})
    .populate('supplier_id')
    .exec(function (err, xx) {
        if (err) return handleError(err);
        
        const response = {
            status_code: 200,
            status: true,
            message: 'return succssfully',
            items: xx,
            pagatination: []
        }

        res.json(response);
    });
});

router.post('/quota', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
   
    let quota = new OfferQuot({
        new_price: req.body.new_price,
        qty: req.body.qty,
        product_id: req.body.product_id,
        supplier_id : req.body.supplier_id
    });

    let rs = await quota.save();
    res.send(rs);
});

router.put('/quota/:id', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const quota = await OfferQuot.findByIdAndUpdate((req.params.id), {
        new_price: req.body.new_price,
        qty: req.body.qty,
        product_id: req.body.product_id,
        supplier_id : req.body.supplier_id
    }, { new: true })

    if (!quota) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(quota);
});

router.delete('/quota/:id', async (req, res) => {
    const quota = await OfferQuot.findByIdAndRemove(req.params.id);
    if (!quota) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(quota);
});

router.get('/quota/:id', async (req, res) => {
    const sp = await OfferQuot.findById(req.params.id);
    if (!sp){
        const response = {
            status_code: 404,
            status: false,
            message: 'The given ID was not found.',
            items: [],
            pagatination: []
        }
        return res.json(response)
    } 
    
    await OfferQuot.findById(req.params.id)
    .populate({path:'product_id',populate : {path : 'product_id'}})
    .exec(function (err, xx) {
        if (err) return handleError(err);

        const response = {
            status_code: 200,
            status: true,
            message: 'return succssfully',
            items: xx,
            pagatination: []
        }

        res.json(response);
    });
});
//#endregion

module.exports = router;