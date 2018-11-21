
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');

const router = express.Router();
const { SubCategory ,Category, Supplier, Product, validateCategory, validateSupplier, validateProduct } = require('../models/categorymodel');


router.get('/', (req, res) => {
    res.send('works')
});


//#region category 
router.get('/category', async (req, res) => {
    const categories = await Category.find().sort({ _id: -1 });
    res.send(categories);
});

router.post('/category', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    let category = new Category({
        name: req.body.name,
        image: req.body.image
    });

    let rs = await category.save();
    res.send(rs);
});

router.put('/category/:id', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const categories = await Category.findByIdAndUpdate((req.params.id), {
        name: req.body.name, image: req.body.image
    }, { new: true })

    if (!categories) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(categories);
});

router.delete('/category/:id', async (req, res) => {
    const categories = await Category.findByIdAndRemove(req.params.id);
    if (!categories) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(categories);
});

router.get('/category/:id', async (req, res) => {
    const categories = await Category.findById(req.params.id);
    if (!categories) return res.status(404).send('The customer with the given ID was not found.');
    res.send(categories);
});
//#endregion

//#region sub-category 
router.get('/subcategory', async (req, res) => {
    const subcategories = await SubCategory.find().sort({ _id: -1 })
    .populate('category_id')
    .exec(function (err, xx) {
        if (err) return handleError(err);
        res.send(xx);
    });;
 });

 router.get('/subcategorybycategoryid/:id', async (req, res) => {
    const subcategories = await SubCategory.find({category_id:req.params.id}).sort({ _id: -1 })
    .populate('category_id')
    .exec(function (err, xx) {
        if (err) return handleError(err);
        res.send(xx);
    });;
 });

router.post('/subcategory', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    let category = new SubCategory({
        name: req.body.name,
        category_id: req.body.category_id
    });

    let rs = await category.save();
    res.send(rs);
});

router.put('/subcategory/:id', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const categories = await SubCategory.findByIdAndUpdate((req.params.id), {
        name: req.body.name, category_id: req.body.category_id
    }, { new: true })

    if (!categories) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(categories);
});

router.delete('/subcategory/:id', async (req, res) => {
    const categories = await SubCategory.findByIdAndRemove(req.params.id);
    if (!categories) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(categories);
});

router.get('/subcategory/:id', async (req, res) => {
    const categories = await SubCategory.findById(req.params.id);
    if (!categories) return res.status(404).send('The customer with the given ID was not found.');
    res.send(categories);
});
//#endregion

//#region supplier 
router.get('/supplier', async (req, res) => {
    const Suppliers = await Supplier.find().sort({ _id: -1 });
    res.send(Suppliers);
});

router.post('/supplier', async (req, res) => {
    // const { error } = validateSupplier(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    let Suppliers = new Supplier({
        name: req.body.name,
        image: req.body.image,
        details: req.body.details
    });

    let rs = await Suppliers.save();
    res.send(rs);
});

router.put('/supplier/:id', async (req, res) => {
    // const { error } = validateSupplier(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const Suppliers = await Supplier.findByIdAndUpdate((req.params.id), {
        name: req.body.name,
        image: req.body.image,
        details: req.body.details
    }, { new: true })

    if (!Suppliers) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(Suppliers);
});

router.delete('/supplier/:id', async (req, res) => {
    const Suppliers = await Supplier.findByIdAndRemove(req.params.id);
    if (!Suppliers) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(Suppliers);
});

router.get('/supplier/:id', async (req, res) => {
    const Suppliers = await Supplier.findById(req.params.id);
    if (!Suppliers) return res.status(404).send('The customer with the given ID was not found.');
    res.send(Suppliers);
});
//#endregion

//#region product 
router.get('/product', async (req, res) => {
    const products = await Product.find().sort({ _id: -1 });
    res.send(products);
});

router.get('/productbysubcategoryid/:id', async (req, res) => {
    const products = await Product.find({sub_category_id:req.params.id}).sort({ _id: -1 })
    .populate('category_id')
    .exec(function (err, xx) {
        if (err) return handleError(err);
        res.send(xx);
    });;
 });

router.post('/product', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    let products = new Product({
        name: req.body.name,
        images: req.body.images,
        details: req.body.details,
        barcode: req.body.barcode,
        supplierno: req.body.supplierno,
        made_country: req.body.made_country,
        image: req.body.image,
        category_id : req.body.category_id,
        sub_category_id : req.body.sub_category_id,
        createat: new Date()
    });

    let rs = await products.save();
    res.send(rs);
});

router.put('/product/:id', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const products = await Product.findByIdAndUpdate((req.params.id), {
        name: req.body.name,
        images: req.body.images,
        details: req.body.details,
        barcode: req.body.barcode,
        supplierno: req.body.supplierno,
        made_country: req.body.made_country,
        category_id : req.body.category_id,
        sub_category_id : req.body.sub_category_id,
        image: req.body.image}, { new: true })

    if (!products) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(products);
});

router.delete('/product/:id', async (req, res) => {
    const products = await Product.findByIdAndRemove(req.params.id);
    if (!products) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(products);
});

router.get('/product/:id', async (req, res) => {
    const products = await Product.findById(req.params.id);
    if (!products) return res.status(404).send('The given ID was not found.');
    res.send(products);
});

router.delete('/product/delete/:img', async (req, res) => {
    var _img = req.params.img
    fs.unlink('./dist/assets/uploads/' + _img, function (err) {
        if (err) return res.status(404).send('حدث خطأ ما');
        res.status(200).json('تم حذف الصورة بنجاح');
    });
});
//#endregion



//sample Join
router.get('/join/:id', async (req, res) => {
     await Product.findById(req.params.id)
        .populate('category_id')
        .exec(function (err, xx) {
            if (err) return handleError(err);
            res.send(xx);
        });
});

//sample Pagination
router.get('/pageSample', async (req, res) => {
    var page = parseInt(req.query.page,10)
    var limit = parseInt(req.query.limit,10)
    const p = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(function (err, doc) {
            if(err) { res.status(500).json(err); return; };
            res.status(200).json({'products':doc,'pagination':{
                'page':page, 'limi':limit
            }});
        })
        
});

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
router.post('/category/file_upload', upload.any(), function (req, res) {
    res.json({ filename: req.files });
})

module.exports = router;