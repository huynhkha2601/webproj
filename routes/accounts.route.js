import express from "express";
import bcrypt from "bcryptjs";
import accountsModel from "../models/accounts.model.js";


const router = express.Router();

router.get('/login', function(req, res){
    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
})

router.post('/login',async function(req, res){
    const user = await accountsModel.findByUsername(req.body.username);
    if(user === null){
        res.redirect('/');
        return;
    }

    let obj = req.body;
    let salt = bcrypt.genSaltSync(10);
    obj.password = bcrypt.hashSync(obj.password, salt);
    if(bcrypt.compareSync(obj.password, user.password)){
        res.redirect('/');
    };

    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
})

router.get('/register', function(req, res){
    res.render('vwAccounts/register', {
        layout: 'accounts.hbs'
    });
})

router.post('/register', async function(req, res){
    let user= req.body;
    console.log(user);
    user.role = 3;
    user.password = await bcrypt.hash(user.password, 10);
    const ret = await accountsModel.add(user);
    const url = '/accounts/register/profile?id=' + ret[0];
    res.redirect(url);

})

router.get('/is-Available', async function(req, res){
    const username = await accountsModel.findByUsername(req.query.username);
    const email = await accountsModel.findByEmail(req.query.email);
    let userVal = true, emailVal=true;
    if (username === null)
        userVal = false;
    if (email === null)
        emailVal = false;
    res.json({userVal: userVal, emailVal: emailVal});
})

router.post('/register/profile',async function(req, res){
    const profile = req.body;
    const id = req.query.id;
    profile.userid = id;
    const ret = await accountsModel.patch(req.body);
    console.log(ret)
    res.redirect('/?id=' + id);
})

router.get('/register/profile', function(req, res){
    // console.log(req.query.id);
    res.render('vwAccounts/profile', {
        layout: 'accounts.hbs'
    });
})

router.post('/register/profile/patch',async function(req, res){
    console.log(req.query.id);
    // const ret = await accountsModel.patch(req.body);
    console.log(req.body);
    res.redirect('/');
})


export default router;