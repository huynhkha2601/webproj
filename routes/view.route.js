import express from "express";
import accountsModel from "../models/user-accounts.model.js";
import productsModel from "../models/products.model.js";
import auctionModel from "../models/auction.model.js";
import mailing from "../utils/mailing.js";

const router = express.Router();

router.get('/fav-list', async function(req, res){
    let fav = await accountsModel.getFavList(req.session.user.userid);
    res.render('vwViews/fav', {
        layout: 'admin.hbs', fav
    });
})

router.get('/fav/:fid', async function(req, res){
    let fid = req.params.fid;
    let pid = req.query.pid;
    let ret = await accountsModel.favProduct({userid: fid, pid});
    res.redirect('/fav-list');
})

router.get('/unfav', async function(req, res){
    let fid = req.query.fid;
    let fav = await accountsModel.unfavProduct(fid);
    res.redirect('/fav-list');
})

router.get('/biding-list', async function(req, res){
    let biding = await accountsModel.getCurBidingList(req.session.user.userid);
    // console.log(biding);
    for (const bidingElement of biding) {
        if(parseInt(bidingElement.holder) === parseInt(req.session.user.userid))
            bidingElement.check = true;
        bidingElement.check = false;
    }
    res.render('vwViews/biding', {
        layout: 'admin.hbs', biding
    });
})

router.get('/won-list', async function(req, res){
    let wons = await accountsModel.getWonList(req.session.user.userid);
    res.render('vwViews/won', {
        layout: 'admin.hbs', wons
    });
})

router.get('/history-list/:productid', async function(req, res){
    let histories = await productsModel.findHistory(req.params.productid);

    res.render('vwViews/history', {
        layout: 'admin.hbs', histories,
    });
})

router.get('/cur-bid/', async function(req, res){
    let curbids = await productsModel.getProductCurBid(req.session.user.userid);
    // console.log(curbids);
    // for (const curbid of curbids) {
    //     curbids.check = (parseInt(curbid.holder) === req.session.user.userid);
    // }
    res.render('vwViews/cur-bids', {
        layout: 'admin.hbs', curbids,
    });
})

router.get('/cur-bid/:productid', async function(req, res){
    let ids = await productsModel.getBidderProductCurBid(req.params.productid);
    let bidders = [];
    for (let id of ids) {
        let info = await accountsModel.findByID(id.idbidder);
        bidders.push(info);
    }
//     console.log(bidders);
    res.render('vwViews/bidder', {
        layout: 'admin.hbs', bidders,
    });
})

router.get('/cur-bid/del/:productid', async function(req, res){

    let product = await productsModel.findByID(req.params.productid);
    let url = `http://localhost:3000/products/detail?productid=${product.productid}`;
    // console.log(product, url);
    let bidder = req.query.userid;
    await auctionModel.delColWithBidderID(bidder);
    if(product.holder === parseInt(bidder)){

        let holder = await accountsModel.findByID(bidder);
        await mailing.sendMailKickAccount(holder.email, product.productname,url);

        let newHolder = await productsModel.getTopBids(product.productid);
        if(newHolder.length === 0){
            let update = {price: product.price - product.step, productid:product.productid};
            await productsModel.patch(update);
        }else{
            // console.log(newHolder);
            let update = {productid: product.productid, holder: newHolder.idbidder, price: newHolder.price};
            await productsModel.patch(update);
        }

        let ban = await productsModel.ban({productid:product.productid, userid:bidder});
    }
    // await productsModel.patch(update);

    res.redirect('/cur-bid');
})


router.get('/seller-won', async function(req, res){

    let wons = await accountsModel.getBidderWonList(req.session.user.userid);
    for (const won of wons) {
        if(won.holder === null)
            won.win = false;
        else
            won.win = true;
    }
    // console.log(wons);

    res.render('vwViews/seller-won-list.hbs', {
        layout: 'admin.hbs', wons,
    });
})
export default router;