import productsModel from "../models/products.model.js";
import auctionModel from "../models/auction.model.js";
import accountsModel from "../models/accounts.model.js";
import ratingsModel from "../models/ratings.model.js";

import Pagnition from "../utils/getListPage.js";


import express from "express";
import mailing from "../utils/mailing.js";

const router = express.Router();

router.get('/', async function (req, res) {
    const tid = req.params.type;
    const limit = 15;
    let curPage = req.query.page || 1;
    if (curPage <= 0) {
        curPage = 1;
    }

    let quantity = await productsModel.findQuantityByType(tid);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;

    let url = req.url.split("?")[0];
    console.log(url);
    let listPages = Pagnition.getListPageByType(curPage, pageNum,url);
    console.log(listPages);
    const products = await productsModel.findByType(tid, (curPage - 1)*limit);
    for (const product of products) {
        product.login = req.session.login;
    }
    res.render('vwProducts/byType', {
        layout: 'searchProducts.hbs',
        products, empty: products.length===0, listPages
    });
});


router.get('/byType/:type', async function (req, res) {
    const tid = req.params.type;
    const limit = 15;
    let curPage = req.query.page || 1;
    if (curPage <= 0) {
        curPage = 1;
    }

    let quantity = await productsModel.findQuantityByType(tid);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;

    let url = req.url.split("?")[0];
    console.log(url);
    let listPages = Pagnition.getListPageByType(curPage, pageNum,url);
    console.log(listPages);
    const products = await productsModel.findByType(tid, (curPage - 1)*limit);
    for (const product of products) {
        product.login = req.session.login;
    }
    res.render('vwProducts/byType', {
        layout: 'searchProducts.hbs',
        products, empty: products.length===0, listPages
    });
});

router.get('/bySearch/:page', async function (req, res) {

    let key = req.query.key;
    let curPage = req.params.page || 1;
    const limit = 15;
    if (curPage <= 0) {
        curPage = 1;
    }

    let quantity = await productsModel.findQuantityByKeySearch(key);

    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;

    // console.log(quantity);
    let listPages = Pagnition.getListSearchByNamePage(curPage, pageNum, req.url.split('?')[1]);
    let products = await productsModel.findProductsByKeySearch(key,(curPage - 1) * limit)
    for (const product of products) {
        product.login = req.session.login;
    }
    console.log(quantity === 0)
    res.render('vwProducts/bySearch', {
        layout: 'searchProducts.hbs',
        empty: quantity === 0, products, listPages, url: req.url
    });
});

router.post('/bySearch', async function (req, res) {
    console.log(req.body);
    res.redirect('/products/bySearch/1?key=' +req.body.search);
});


router.get('/detail', async function (req, res) {
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);
    const history = await productsModel.findHistoryProduct(productid);
    const sameType = await productsModel.findProductSameByType(product.type, productid);

    let seller = await accountsModel.findByID(product.sellerid);
    // console.log(product.sellerid ,seller);
    let holder = await accountsModel.findByID(product.holder);
    // console.log(holder);
    let total;

    let holderpoint =0;
    if (holder === null){
        holderpoint = 0;
    }else {
        let holdertotal = await ratingsModel.findRating(product.holder);
        if (holdertotal.diem === null)
            holdertotal.diem = 0;

        holderpoint  = ((holdertotal.diem / holdertotal.tong) * 100).toFixed(2);
    }

    total = await ratingsModel.findRating(seller.userid);
    if (total.diem === null)
        total.diem = 0;
    let point = ((total.diem / total.tong) * 100).toFixed(2);

    let isFav = await productsModel.getFav(req.session.user.userid,productid);

    res.render('vwProducts/detail', {
        layout: 'home.hbs',
        product, empty: history.length === 0, history,
        end: product.dateend.getTime() < new Date().getTime(), sameType,
        holder, point, seller, holderpoint, isFav
    });
});

router.post('/auction', async function (req, res) {
    let yourMax = parseInt(req.body.max_price);
    let step = req.query.step;
    let entity = req.query;
    let url = `http://localhost:3000/products/detail?productid=${entity.productid}`;
    if (entity.idbidder <= 0 || entity.idbidder === null || entity.idbidder === undefined){
       res.redirect('/accounts/login/');
       return;
    }

    delete entity.step;
    let curPrice = parseInt(entity.price);
    let curDate = new Date();
    let endDate = await productsModel.getEndDate(entity.productid);
    // console.log(step, entity);
    if (curDate.getTime() > new Date(endDate).getTime()){
        // Redirect to view with err_mess
        // CurDate > EndDate, can't biding

    }else{
        if (yourMax >= curPrice + parseInt(step)) {
            let curHolder = await productsModel.checkTopID(entity.productid);
            let curMax = await productsModel.getMaxPrice(entity.productid);
            if (curHolder !== -1) {

                if (curHolder === parseInt(entity.idbidder)) {

                    if (yourMax > curMax) {
                        entity.price = curPrice;
                        entity.max_price = yourMax;
                        let rs = await auctionModel.patchWithID(entity);
                        let user = await accountsModel.findByID(entity.idbidder);
                        await mailing.sendMailUpdateSuccessAuction(user.email, user.fullname, url);
                        // console.log(true ,4, entity);
                    }

                } else {

                    if (yourMax >= curMax + parseInt(step)) {

                        // console.log(true ,4);
                        entity.price = curMax + parseInt(step);
                        entity.max_price = yourMax;

                        let rs = await auctionModel.addRecord(entity);
                        let user = await accountsModel.findByID(entity.idbidder);
                        await mailing.sendMailSuccessAuction(user.email, user.fullname, url);

                    } else {
                        entity.price = parseInt(entity.price) + parseInt(step);
                        entity.max_price = yourMax;
                        await auctionModel.addRecord(entity)
                        let user = await accountsModel.findByID(entity.idbidder);
                        await mailing.sendMailSuccessAuction(user.email, user.fullname, url);


                        let update = {
                            idbidder: curHolder, price: yourMax + parseInt(step),
                            max_price: curMax, productid: entity.productid
                        };
                        await auctionModel.addRecord(update);
                        let updateUser = await accountsModel.findByID(update.idbidder);
                        await mailing.sendMailUpdateSuccessAuction(updateUser.email, updateUser.fullname, url);
                    }


                    if (new Date(endDate).getTime() <= curDate.getTime() + 15*60000) {
                        let updateDate = new Date(endDate).getTime()+ 15*60000;
                        let ret = await productsModel.patch({productid: entity.productid, dateend: new Date(updateDate)});
                    }

                }

            } else {
                entity.price = curPrice + parseInt(step);
                entity.max_price = yourMax;
                let rs = await auctionModel.addRecord(entity);
                // console.log(rs);

                if (new Date(endDate).getTime() <= curDate.getTime() + 15*60000) {
                    let updateDate = new Date(endDate).getTime()+ 15*60000;
                    let ret = await productsModel.patch({productid: entity.productid, dateend: new Date(updateDate)});
                    let user = await accountsModel.findByID(entity.idbidder);
                    await mailing.sendMailSuccessAuction(user.email, user.fullname, url);
                }
            }



        } else {
            // Redirect to view with err_mess
        }
    }

    res.redirect('/products/detail?productid=' + req.query.productid);

});





export default router;