const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Delivry, BuyUnits, DeliveryOption, BuyOption, SocialOption, ContactOption, validate, StaticPage } = require('../models/constantmodel');


router.get('/', (req, res) => {
    res.send('works')
});

//#region Delivery
router.get('/delivery', async (req, res) => {
    const deliveries = await Delivry.find().sort({ _id: -1 });
    res.send(deliveries);
});

router.post('/delivery', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let delivry = new Delivry({
        name: req.body.name
    });

    let rs = await delivry.save();
    res.send(rs);
});

router.put('/delivery/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const delivry = await Delivry.findByIdAndUpdate((req.params.id), {
        name: req.body.name
    }, { new: true })

    if (!delivry) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(delivry);
});

router.delete('/delivery/:id', async (req, res) => {
    const delivry = await Delivry.findByIdAndRemove(req.params.id);
    if (!delivry) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(delivry);
});
//#endregion

//#region BuyUnits
router.get('/BuyUnits', async (req, res) => {
    const buyunits = await BuyUnits.find().sort({ _id: -1 });
    res.send(buyunits);
});

router.post('/BuyUnits', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let Buyunits = new BuyUnits({
        name: req.body.name
    });

    let rs = await Buyunits.save();
    res.send(rs);
});

router.put('/BuyUnits/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const Buyunits = await BuyUnits.findByIdAndUpdate((req.params.id), {
        name: req.body.name
    }, { new: true })

    if (!Buyunits) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(Buyunits);
});

router.delete('/BuyUnits/:id', async (req, res) => {
    const Buyunits = await BuyUnits.findByIdAndRemove(req.params.id);
    if (!Buyunits) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(Buyunits);
});
//#endregion

//#region DeliveryOption
router.get('/DeliveryOption', async (req, res) => {
    const DeliveryOptions = await DeliveryOption.find().sort({ _id: -1 });
    res.send(DeliveryOptions);
});

router.post('/DeliveryOption', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let DeliveryOptions = new DeliveryOption({
        name: req.body.name
    });

    let rs = await DeliveryOptions.save();
    res.send(rs);
});

router.put('/DeliveryOption/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const DeliveryOptions = await DeliveryOption.findByIdAndUpdate((req.params.id), {
        name: req.body.name
    }, { new: true })

    if (!DeliveryOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(DeliveryOptions);
});

router.delete('/DeliveryOption/:id', async (req, res) => {
    const DeliveryOptions = await DeliveryOption.findByIdAndRemove(req.params.id);
    if (!DeliveryOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(DeliveryOptions);
});
//#endregion

//#region BuyOptions
router.get('/BuyOptions', async (req, res) => {
    const BuyOptions = await BuyOption.find().sort({ _id: -1 });
    res.send(BuyOptions);
});

router.post('/BuyOptions', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let BuyOptions = new BuyOption({
        name: req.body.name
    });

    let rs = await BuyOptions.save();
    res.send(rs);
});

router.put('/BuyOptions/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const BuyOptions = await BuyOption.findByIdAndUpdate((req.params.id), {
        name: req.body.name
    }, { new: true })

    if (!BuyOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(BuyOptions);
});

router.delete('/BuyOptions/:id', async (req, res) => {
    const BuyOptions = await BuyOption.findByIdAndRemove(req.params.id);
    if (!BuyOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(BuyOptions);
});
//#endregion

//#region Social Option
router.get('/SocialOption', async (req, res) => {
    const SocialOptions = await SocialOption.find().sort({ _id: -1 });
    res.send(SocialOptions);
});

router.post('/SocialOption', async (req, res) => {
    let SocialOptions = new SocialOption({
        name: req.body.name,
        data: req.body.data
    });

    let rs = await SocialOptions.save();
    res.send(rs);
});

router.put('/SocialOption/:id', async (req, res) => {
    const SocialOptions = await SocialOption.findByIdAndUpdate((req.params.id), {
        name: req.body.name, data: req.body.data
    }, { new: true })

    if (!SocialOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(SocialOptions);
});

router.delete('/SocialOption/:id', async (req, res) => {
    const SocialOptions = await SocialOption.findByIdAndRemove(req.params.id);
    if (!SocialOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(SocialOptions);
});
//#endregion

//#region Contact Option
router.get('/ContactOption', async (req, res) => {
    const ContactOptions = await ContactOption.find().sort({ _id: -1 });
    res.send(ContactOptions);
});

router.post('/ContactOption', async (req, res) => {
    let ContactOptions = new ContactOption({
        name: req.body.name,
        data: req.body.data
    });

    let rs = await ContactOptions.save();
    res.send(rs);
});

router.put('/ContactOption/:id', async (req, res) => {
    const ContactOptions = await ContactOption.findByIdAndUpdate((req.params.id), {
        name: req.body.name, data: req.body.data
    }, { new: true })

    if (!ContactOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(ContactOptions);
});

router.delete('/ContactOption/:id', async (req, res) => {
    const ContactOptions = await ContactOption.findByIdAndRemove(req.params.id);
    if (!ContactOptions) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(ContactOptions);
});
//#endregion

//#region Static Page
router.get('/staticpage', async (req, res) => {
    const staticpages = await StaticPage.find().sort({ _id: -1 });
    res.send(staticpages);
});

router.post('/staticpage', async (req, res) => {
    let staticpages = new StaticPage({
        title: req.body.title,
        content: req.body.content
    });

    let rs = await staticpages.save();
    res.send(rs);
});

router.put('/staticpage/:id', async (req, res) => {
    const staticpages = await StaticPage.findByIdAndUpdate((req.params.id), {
        title: req.body.title, content: req.body.content
    }, { new: true })

    if (!staticpages) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(staticpages);
});

router.delete('/staticpage/:id', async (req, res) => {
    const staticpages = await StaticPage.findByIdAndRemove(req.params.id);
    if (!staticpages) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(staticpages);
});

router.get('/staticpage/:id', async (req, res) => {
    const StaticPages = await StaticPage.findById(req.params.id);
    if (!StaticPages) return res.status(404).send('The customer with the given ID was not found.');
    res.send(StaticPages);
});
//#endregion


module.exports = router;