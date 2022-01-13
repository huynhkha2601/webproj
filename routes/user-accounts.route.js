import express from "express";
import accountsModel from "../models/user-accounts.model.js";
import auctionModel from "../models/auction.model.js";
import productsModel from "../models/products.model.js";

import mailing from "../utils/mailing.js";

const router = express.Router();

router.get('/', async function (req, res) {
    const bidderList = await accountsModel.findAll(3);
    const sellerList = await accountsModel.findAll(2);
    res.render('vwUserAccounts/index', {
        layout: 'admin.hbs',
        bidders: bidderList,
        sellers: sellerList
    });
})

router.get('/add', function (req, res) {
    res.render('vwUserAccounts/add', {
        layout: 'admin.hbs'
    });
});

router.post('/add', async function (req, res) {
    req.body.role = 3;
    const ret = await accountsModel.add(req.body);
    res.render('vwUserAccounts/add', {
        layout: 'admin.hbs',
    });
});

router.get('/edit', async function (req, res) {
    const userid = req.query.userid || 0;
    const account = await accountsModel.findByID(userid);
    if (account === null)
        return res.redirect('/admin/user-accounts');
    res.render('vwUserAccounts/edit', {
        account,
        layout: 'admin.hbs'
    });
})

router.get('/del', async function (req, res) {

    let account = await accountsModel.findByID(req.query.userid);
    let curBidProducts = await auctionModel.listCurProductsBids(req.query.userid);
    if (curBidProducts === null) {
        await mailing.sendMailDeleteAccount(account.email);
    } else {
        for (const curBidProduct of curBidProducts) {
            let product = await productsModel.findByID(curBidProduct.productid);
            let url = `http://localhost:3000/products/detail?productid=${product.productid}`;

            let seller = await accountsModel.findByID(product.sellerid);
            // console.log(product)
            let curHolder = product.holder;
            let ret = await auctionModel.delColWithBidderID(req.query.userid);

            let record = await productsModel.getTopBids(product.productid);
            // console.log(record);
            if (record === -1) {
                await productsModel.patch({
                    productid: product.productid,
                    price: product.price - product.step,
                    holder: null
                });
                await mailing.sendMailSellerDeleteAnBidsAccount(seller.email, product.productname, url);

            } else{
                await productsModel.patch({
                    productid: product.productid,
                    price: record.price,
                    holder: record.idbidder
                });
                await mailing.sendMailSellerDeleteAnBidsAccount(seller.email, product.productname, url);

            }
        }

    }
    await mailing.sendMailDeleteAccount(req.query.userid);
    const ret = await accountsModel.del(req.query.userid);
    res.redirect('/admin/user-accounts');
});

router.post('/patch', async function (req, res) {
    const ret = await accountsModel.patch(req.body);
    res.redirect('/admin/user-accounts');
});

// router.get('/reset-confirm',async function(req, res){
//     console.log(req.body, req.query);
//     let account = await accountsModel.findByID(req.query.userid);
//     console.log(account);
//     await mailing.sendMailResetPassword(account.email);
//     // const ret = await accountsModel.del(req.body.userid);
//     res.redirect('/admin/user-accounts');
// });

export default router;