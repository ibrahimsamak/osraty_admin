
const express = require('express');
const _ = require('underscore');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const router = express.Router();
const { SupplierProduct } = require('../models/supplier-product');

router.get('/', (req, res) => {
    res.send('works')
});


//#region Supplier Products 
router.get('/supplierproducts', async (req, res) => {
    const prod = await SupplierProduct.find().sort({ _id: -1 });
    const response = {
        items :prod,
        status_code : 200,
        message :'returned successfully'
    }
    res.json(response);
});

router.post('/supplierproducts', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
    let supplierproducts = new SupplierProduct({
        supplier_id: req.body.supplier_id,
        category_id: req.body.category_id,
        product_id: req.body.product_id,
        prices: req.body.prices,
        qty: req.body.qty,
        dt_end: req.body.dt_end,
        sub_category_id: req.body.sub_category_id,
        rate: 0
    });

    let rs = await supplierproducts.save();
    res.send(rs);
});

router.put('/supplierproducts/:id', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const sp = await SupplierProduct.findByIdAndUpdate((req.params.id), {
        supplier_id: req.body.supplier_id,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        product_id: req.body.product_id,
        prices: req.body.prices,
        qty: req.body.qty,
        dt_end: req.body.dt_end
    }, { new: true })

    if (!sp) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(sp);
});

router.delete('/supplierproducts/:id', async (req, res) => {
    const sp = await SupplierProduct.findByIdAndRemove(req.params.id);
    if (!sp) return res.status(404).send('حدث خطأ الرجاء المحاولة مرة اخرى');
    res.send(sp);
});

router.get('/supplierproducts/:id', async (req, res) => {
    const sp = await SupplierProduct.findById(req.params.id);
    if (!sp) return res.status(404).send('The given ID was not found.');
    res.json(sp);
});

router.post('/supplierproductsSearch', async (req, res) => {
    // const { error } = validateProduct(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
    // const sp = await SupplierProduct.findOne({supplier_id:req.body.id});
    // res.send(sp);

    await SupplierProduct.find({ supplier_id: req.body.id })
        .populate('category_id')
        .populate('product_id')
        .exec(function (err, xx) {
            if (err) return handleError(err);

            const response = {
                items : xx,
                status_code:200,
                message : 'returned successfully'
            }
            res.json(response);
        });
});

//عرض  المنتجات من تصنيف فرعي لهايبر معين
router.get('/supplierproductsBySubCategoryId/:id/:supid', async (req, res) => {
    await SupplierProduct.find({ sub_category_id: req.params.id, supplier_id: req.params.supid })
        .populate('product_id')
        .select('product_id')
        .exec(function (err, xx) {
            if (err) return handleError(err);
            const response = {
                items :  xx,
                status_code :  200,
                message :  'returned successfully'
            }
            res.json(response);
        });
});

//عرض  المنتجات من هايبر معين
router.get('/supplierproductsBySupplierId/:id', async (req, res) => {
    await SupplierProduct.find({ supplier_id: req.params.id })
        .populate('product_id')
        .select('product_id')
        .exec(function (err, xx) {
            if (err) return handleError(err);
            const response = {
                items :  xx,
                status_code :  200,
                message : 'returned successfully'
            }
            res.json(response);
        });
});

//المنتجات المقترجة من متجر معين ومنتج معين 
router.post('/relatedPoductsInSupplier', async (req, res) => {
    await SupplierProduct.find({
        'supplier_id': req.body.supplier_id
        , 'category_id': req.body.category_id
    })
        .populate('category_id')
        .populate('product_id')
        .exec(function (err, xx) {
            if (err) { return handleError(err); }
            else {
                var result = _.filter(xx, function (itm) {
                    return itm.product_id.name.indexOf(req.body.name) >= 0
                });
                const response = {
                    items :  result,
                    status_code : 200,
                    message :  'returned successfully'
                }
                res.json(response);
            }
        });
});

//المنتجات البديلة من متجر اخر ومنتج معين 
router.post('/relatedPoductsInOtherSupplier', async (req, res) => {
    await SupplierProduct.find({
        'category_id': req.body.category_id,
        'product_id': req.body.product_id
    })
        .populate('category_id')
        .populate('product_id')
        .exec(function (err, result) {
            if (err) { return handleError(err); }
            else {
                const response = {
                    items :  result,
                    status_code :  200,
                    message :  'returned successfully'
                }
                res.json(response);
            }
        });
});

//البحث باسم معين وتصنيف معين
router.post('/search', async (req, res) => {
    await SupplierProduct.find({
        'category_id': req.body.category_id,
        'sub_category_id': req.body.sub_category_id
    })
        .populate('category_id')
        .populate('product_id')
        .exec(function (err, xx) {
            if (err) { return handleError(err); }
            else {
                var result = _.filter(xx, function (itm) {
                    return itm.product_id.name.indexOf(req.body.name) >= 0
                });
                const response = {
                    items :  result,
                    status_code :  200,
                    message :  'returned successfully'
                }
                res.json(response);
            }
        });
});

router.post('/advanceSearch', async (req, res) => {
    await SupplierProduct.find({
        'rate': req.body.rate,
        'prices.price': {
            $gte: req.body.price1,
            $lte: req.body.price2
        }
    })
        .populate('category_id')
        .populate('product_id')
        .exec(function (err, xx) {
            if (err) { return handleError(err); }
            else {
                const response = {
                    items :  xx,
                    status_code :  200,
                    message :  'returned successfully'
                }
                res.json(response);
            }
        });
});

router.post('/liken', async (req, res) => {

    var count = 0;
    var items = [];
   await req.body.cart.forEach(async function (element) {
        var product_id = element.product_id;
        var supplier_id = element.supplier_id;

        // const exsits_price = await SupplierProduct.findOne({supplier_id:supplier_id , product_id : product_id});
        
        await SupplierProduct.find({
            'product_id': { $in: product_id },
            'supplier_id': { $nin: supplier_id }
        })
            .populate('category_id')
            .populate('product_id')
            .sort('-prices.price')
            .exec(function (err, xx) {
                if (err) { 
                    return handleError(err); 
                }
                else {
                    if (xx.length > 0) {
                        items.push(xx[0])
                    }
                    count++;
                    if (count === req.body.cart.length)
                    {
                        count=0
                        const response = {
                            items:items,
                            status_code :  200,
                            message :  'returned successfully'
                        }
                        res.json(response);
                        res.end()
                    }
                }
         });
    });
});
//#endregion

router.get('/xx/:id', async (req, res) => {
    await SupplierProduct.findById(req.params.id)
        .populate('supplier_id')
        .populate('category_id')
        .populate('product_id')
        .exec(function (err, xx) {
            if (err) return handleError(err);
            res.send(xx);
        });
});

module.exports = router;