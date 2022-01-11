import express from "express";
import request from "request";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

import accountsModel from "../models/accounts.model.js";
import format from "date-format";


const router = express.Router();

router.get('/login', function(req, res){
    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
})

router.post('/login',async function(req, res){
    const user = await accountsModel.findByUsername(req.body.username);

    if(user === null){
        res.redirect('/login');
        return;
    }

    let isTrue = bcrypt.compareSync(req.body.password,user.password);
    if(isTrue){
        req.session.login = true;
        req.session.user =  user;

        let role = user.role;
        if(role == 0){
            res.redirect('/admin');
            return;
        }
        res.redirect('/');
        return;
    };

    res.render('vwAccounts/login', {
        layout: 'accounts.hbs',
        err_message: "Username or password is wrong!", err: true
    });
})

router.get('/register', function(req, res){
    res.render('vwAccounts/register', {
        layout: 'accounts.hbs'
    });
})

router.post('/register', async function(req, res){
    let user= req.body;

    user.role = 3;
    let salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    const ret = await accountsModel.add(user);
    res.redirect('/accounts/register/profile?id=' + ret[0]);

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
    console.log(profile);
    const id = req.query.id;
    profile.userid = id;
    const ret = await accountsModel.patch(profile);
    console.log(ret)
    res.redirect('/?id=' + id);
})

router.get('/register/profile', function(req, res){
    // console.log(req.query.id);
    res.render('vwAccounts/profile', {
        layout: 'accounts.hbs'
    });
})

router.post('/captcha/api',function(req,res){

    if(req.body['g-recaptcha-response'] === undefined ||
        req.body['g-recaptcha-response'] === '' ||
        req.body['g-recaptcha-response'] === null) {
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
    // Put your secret key here.
    let secretKey = "6LczRgYeAAAAAFsi3pozmFXaQMRJzfYJ21f9A0LJ";
    // req.connection.remoteAddress will provide IP address of connected user.
    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
    });
});

router.get('/logout', function(req, res){
    req.session.login = false;
    res.redirect("/");
})




export default router;