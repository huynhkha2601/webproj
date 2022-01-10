import express from "express";
import accountsModel from "../models/user-accounts.model.js";



const router = express.Router();

router.get('/fav-list', async function(req, res){
    let fav = await accountsModel.getFavList(req.session.user.userid);
    res.render('vwViews/fav', {
        layout: 'admin.hbs', fav
    });
})

router.get('/unfav', async function(req, res){
    let fid = req.query.fid;
    let fav = await accountsModel.unfavProduct(fid);
    res.redirect('/fav-list');
})

router.get('/biding-list', async function(req, res){

    let biding = await accountsModel.getCurBidingList(4);
    console.log(biding);
    res.render('vwViews/biding', {
        layout: 'admin.hbs', biding
    });
})

export default router;