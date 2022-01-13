import express from "express";
import accountsModel from "../models/user-accounts.model.js";
import productsModel from "../models/products.model.js";

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
    let wons = await accountsModel.getWonList(3);
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

router.get('/cur-bid/:productid', async function(req, res){
    let curbids = await productsModel.findCurBids(req.params.productid);
    res.render('vwViews/history', {
        layout: 'admin.hbs', histories,
    });
})

export default router;