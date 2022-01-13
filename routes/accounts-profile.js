import express from "express";

const router = express.Router();

router.get('/', function(req, res){
    res.render('vwAccountsProfile/profile',{
        layout: 'admin.hbs'
    })
});

router.get('/edit', function(req, res){
    res.render('vwAccountsProfile/edit',{
        layout: 'admin.hbs'
    })
});

router.get('/changepw', function(req, res){
    res.render('vwAccountsProfile/changepw',{
        layout: 'admin.hbs'
    })
});


export default router;