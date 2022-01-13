import express from 'express';
import morgan from 'morgan';
import cron from "node-cron";

// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import joi from "joi";
// import mailer from "nodemailer";

import localMdw from "./middlewares/locals.mdw.js"
import routeMdw from "./middlewares/routes.mdw.js";
import viewMdw from "./middlewares/view.mdw.js";
import sessionMdv from "./middlewares/sessions.mdw.js";

import productsModel from "./models/products.model.js";
import accountsModel from "./models/accounts.model.js";
import mailing from "./utils/mailing.js";


const app = express();

app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));

sessionMdv(app);
viewMdw(app);
localMdw(app);
routeMdw(app);

cron.schedule('* * * * * *', async ()=>{
    let products = await productsModel.findEndProducts();
    for (const product of products[0]) {
        let url = `http://localhost:3000/products/detail?productid=${product.productid}`;
        if(product.holder === null){
            let seller = await accountsModel.findByID(product.sellerid);
            // console.log(seller, product.holder);
            await mailing.sendMailSellerFailedAuc(seller.email, product.productname,url)
        }else{
            let holder = await accountsModel.findByID(product.holder);
            let seller = await accountsModel.findByID(product.sellerid);
            // console.log(seller, holder);
            await mailing.sendMailSellerSuccessAuc(seller.email, product.productname,url);
            await mailing.sendMailSuccessBuy(holder.email, product.productname, url);
        }
        let update = {productid: product.productid, isFinish: 1};
        await productsModel.patch(update);
        let ret = await productsModel.addBuy({bidderid: holder, productid: product.productid});
    }
    // console.log("--------------------------------------------");

},{
    schuduled: true
});


const port = 3000;
app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
})