import express from "express";
import accountsModel from "../models/accounts.model.js";

const router = express.Router();

router.get('/', async function (req, res){
    const accountList = await accountsModel.findAll();
    res.render('vwAccounts/index', {
        layout: 'admin.hbs',
        accounts: accountList
    });
})

router.get('/add', function(req, res){
    res.render('vwAccounts/add', {
        layout: 'admin.hbs'
    });
});

router.post('/add',async function(req, res){
    req.body.role = 1;
    await accountsModel.add(req.body);
    res.render('vwAccounts/add',{
        layout: 'admin.hbs',
    });
});
router.get('/edit', async function(req, res){
    const userid = req.query.userid || 1;
    const account = await accountsModel.findByID(userid);
    if (account === null)
        return res.redirect('/admin/accounts');
    res.render('vwAccounts/edit',{
        account,
        layout: 'admin.hbs'
    });
})


export default router;