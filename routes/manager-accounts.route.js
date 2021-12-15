import express from "express";
import accountsModel from "../models/manager-accounts.model.js";

const router = express.Router();

router.get('/', async function (req, res){
    const accountList = await accountsModel.findAll();
    res.render('vwManagerAccounts/index', {
        layout: 'admin.hbs',
        accounts: accountList
    });
})

router.get('/add', function(req, res){
    res.render('vwManagerAccounts/add', {
        layout: 'admin.hbs'
    });
});

router.post('/add',async function(req, res){
    req.body.role = 1;
    const ret = await accountsModel.add(req.body);
    res.render('vwManagerAccounts/add',{
        layout: 'admin.hbs',
    });
});
router.get('/edit', async function(req, res){
    const userid = req.query.userid || 0;
    const account = await accountsModel.findByID(userid);
    if (account === null)
        return res.redirect('/admin/accounts');
    res.render('vwManagerAccounts/edit',{
        account,
        layout: 'admin.hbs'
    });
})

router.post('/del',async function(req, res){
    console.log(req.body.userid);
    const ret = await accountsModel.del(req.body.userid);
    res.render('vwManagerAccounts/edit',{
        layout: 'admin.hbs',
    });
});
router.post('/patch', async function(req, res){
    const ret = await accountsModel.patch(req.body);
    res.render('vwManagerAccounts/edit',{
        layout: 'admin.hbs',
    });
});

export default router;