import express from "express";

const router = express.Router();

router.get('/', function(req, res){
    res.render('vwAccountsProfile/accounts-profile',{
        layout: 'accounts-profile.hbs'
    })
});

router.get('/edit', function(req, res){
    res.render('vwAccountsProfile/edit',{
        layout: 'accounts-profile.hbs'
    })
});

router.get('/changepw', function(req, res){
    res.render('vwAccountsProfile/changepw',{
        layout: 'accounts-profile.hbs'
    })
});


export default router;