import express from "express";
import ratingsModel from "../models/ratings.model.js";
import accountsModel from "../models/accounts.model.js";
import bcrypt from "bcryptjs";
import asyncErrors from "express-async-errors";

const router = express.Router();

router.get('/',async function(req, res){

    let ratings = await ratingsModel.findByUserID(req.session.user.userid);
    let total = await ratingsModel.findRating(req.session.user.userid);
    if (total.diem === null)
        total.diem = 0;
    let point = ((total.diem / total.tong) * 100).toFixed(2);

    let profile = await accountsModel.findByID(req.session.user.userid);
    let promise = await accountsModel.getUpdateSeller(req.session.user.userid);
    let update = (point >= 80 && total.tong >= 10);
    // console.log(total, update)
    res.render('vwAccountsProfile/profile',{
        layout: 'admin.hbs',ratings, point, profile, promise: promise.length !== 0, update
    })
});

router.get('/upgrade',async function(req, res){
    let userid = req.session.user.userid;
    let promise = await accountsModel.getUpdateSeller(req.session.user.userid);
    if (promise.length === 0)
        await accountsModel.requestUpdateSeller({bidderid: userid});
    res.redirect('/profile');
});

router.get('/review/:userid',async function(req, res){
    let userid = req.params.userid;
    let assessor = req.session.user.userid;
    if (assessor === null)
        res.status(404);
    res.render('vwAccountsProfile/review',{
        layout: 'admin.hbs', userid, assessor
    })
});

router.post('/review/:userid',async function(req, res){
    // console.log(req.body);
    res.render('vwAccountsProfile/review',{
        layout: 'admin.hbs', userid: req.params.userid, info: true, info_message: "Review an user successfully. Thank you!"
    })
});

router.get('/edit', async function(req, res){
    let profile = await accountsModel.findByID(req.session.user.userid);

    res.render('vwAccountsProfile/edit',{
        layout: 'admin.hbs',profile
    })
});

router.post('/edit', async function(req, res){
    let user = req.body;
    // console.log(user);
    user.userid = req.session.user.userid;
    if (user.dob === '')
        delete user.dob;

    let ret = await accountsModel.patch(user);
    res.redirect('/profile');
});

router.get('/changepw', function(req, res){
    res.render('vwAccountsProfile/changepw',{
        layout: 'admin.hbs', err: false
    })
});

router.post('/changepw', async function(req, res){
    let user = req.body;

    let account = await accountsModel.findByID(req.session.user.userid);

    let salt = bcrypt.genSaltSync(10);
    let isTrue = bcrypt.compareSync(req.body.old,account.password);

    if(isTrue){
        if (user.password === user.confirm){
            let update = {password: user.password, userid: req.session.user.userid};
            let ret = await accountsModel.patch(update);
            res.redirect('/profile');
            return;
        }else{
            res.render('vwAccountsProfile/changepw',{
                layout: 'admin.hbs', err_message: "Password and confirm does not match!", err: true,
            });
            return
        }

    }

    res.render('vwAccountsProfile/changepw',{
        layout: 'admin.hbs', err_message: "Password does not match!", err: true
    })

});

export default router;