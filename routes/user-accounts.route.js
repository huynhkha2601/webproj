import express from "express";
import accountsModel from "../models/user-accounts.model.js";

const router = express.Router();

router.get('/', async function (req, res){
    const bidderList = await accountsModel.findAll(3);
    const sellerList = await accountsModel.findAll(2);
    res.render('vwUserAccounts/index', {
        layout: 'admin.hbs',
        bidders: bidderList,
        sellers: sellerList
    });
})

router.get('/add', function(req, res){
    res.render('vwUserAccounts/add', {
        layout: 'admin.hbs'
    });
});

router.post('/add',async function(req, res){
    req.body.role = 3;
    const ret = await accountsModel.add(req.body);
    res.render('vwUserAccounts/add',{
        layout: 'admin.hbs',
    });
});
router.get('/edit', async function(req, res){
    const userid = req.query.userid || 0;
    const account = await accountsModel.findByID(userid);
    if (account === null)
        return res.redirect('/admin/user-accounts');
    res.render('vwUserAccounts/edit',{
        account,
        layout: 'admin.hbs'
    });
})

router.post('/del',async function(req, res){
    const ret = await accountsModel.del(req.body.userid);
    res.render('vwUserAccounts/edit',{
        layout: 'admin.hbs',
    });
});
router.post('/patch', async function(req, res){
    const ret = await accountsModel.patch(req.body);
    res.redirect('/admin/user-accounts');
});

export default router;