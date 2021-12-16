import express from "express";
import bcrypt from "bcrypt";
import accountsModel from "../models/accounts.model.js";


const router = express.Router();

router.post('/register', async function(req, res){
    var obj = req.body;

    // if(!(obj.password) )
    obj.password = await bcrypt.hash(obj.password, 10);

    // const userid =
    res.render('vwAccounts/register', {
        layout: 'accounts.hbs'
    });
})

router.get('/register', function(req, res){
    res.render('vwAccounts/register', {
        layout: 'accounts.hbs'
    });
})

router.get('/register/profile', function(req, res){
    res.render('vwAccounts/profile', {
        layout: 'accounts.hbs'
    });
})

router.get('/login', function(req, res){
    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
})

export default router;