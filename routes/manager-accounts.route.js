import express from "express";
import accountsModel from "../models/manager-accounts.model.js";
import bcrypt from "bcryptjs";

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
    let account =req.body;
    account.role = 1;

    let salt = bcrypt.genSaltSync(10);
    account.password = bcrypt.hashSync(account.password, salt);
    const ret = await accountsModel.add(account);

    res.render('vwManagerAccounts/add',{
        layout: 'admin.hbs',
    });
});

router.get('/edit', async function(req, res){
    const userid = req.query.userid || 0;
    const account = await accountsModel.findByID(userid);
    if (account === null)
        return res.redirect('/admin/manager-accounts');
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
    res.redirect('/admin/manager-accounts');
});

export default router;