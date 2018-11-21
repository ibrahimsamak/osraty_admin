const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser')
const routes = require('./server/routes/constant');
const product = require('./server/routes/product');
const supplierproducts = require('./server/routes/supplierproducts');
const Adv = require('./server/routes/Advs');
const User = require('./server/routes/user');
const Basket = require('./server/routes/basket');
const quota = require('./server/routes/offerquot');

if(!config.get('jwtPrivateKey')){
    console.error('no token');
    process.exit(1);
}

const path = require('path');
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'dist')));


mongoose.connect('mongodb://localhost:27017/liken' , { useNewUrlParser: true })
.then(()=>('connect to db'))
.catch(()=>('err'))

app.use('/constant',routes);
app.use('/product',product);
app.use('/Supplier',supplierproducts);
app.use('/Adv',Adv);
app.use('/User',User);
app.use('/basket',Basket);
app.use('/quota',quota);
require('./server/startup/prod')(app);

app.get('*',(req,res)=>{
     res.sendFile(path.join(__dirname,'dist/index.html'))
});

const port = process.env.PORT || 3000
app.listen(port, (res,req)=>{
    console.log(`listing to the server ${port}`)
});