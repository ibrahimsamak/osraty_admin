const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const router = express.Router();
const { Adv, validateAdv } = require('../models/adv');



//#region Advs 
router.get('/adv', async (req, res) => {
    const Advs = await Adv.find().sort({ _id: -1 });
    const response = {
        status_code: 200,
        status: true,
        message: 'return succssfully',
        items: Advs,
        pagatination: []
    }
    res.json(response);
});

router.post('/adv', async (req, res) => {
    // const { error } = validateAdv(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    let Advs = new Adv({
        name: req.body.name,
        image: req.body.image,
        details: req.body.details,
        type : req.body.type,
        price_after: req.body.price_after,
        price_before: req.body.price_before
    });

    let rs = await Advs.save();
    res.send(rs);
});

router.put('/adv/:id', async (req, res) => {
    // const { error } = validateAdv(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const Advs = await Adv.findByIdAndUpdate((req.params.id), {
        name: req.body.name,
        image: req.body.image,
        details: req.body.details,
        type : req.body.type,
        price_after: req.body.price_after,
        price_before: req.body.price_before
    }, { new: true })

    if (!Advs) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(Advs);
});

router.delete('/adv/:id', async (req, res) => {
    const Advs = await Adv.findByIdAndRemove(req.params.id);
    if (!Advs) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(Advs);
});

router.get('/adv/:id', async (req, res) => {
    const Advs = await Adv.findById(req.params.id);
    if (!Advs) return res.status(404).send('The given ID was not found.');
    res.send(Advs);
});
//#endregion


module.exports = router;