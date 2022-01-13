import express from "express";
import accountsModel from "../models/accounts.model.js";
import bcrypt from "bcryptjs";
import mailing from "../utils/mailing.js";


const router = express.Router();

router.get('/',async  function (req, res) {
    res.render('admin', {
        layout: 'admin.hbs'
    });
});

router.get('/reset',async  function (req, res) {
    let requests = await accountsModel.findAllRequest();

    res.render('vwUserAccounts/reset', {
        layout: 'admin.hbs', requests
    });
});

router.get('/reset-confirm',async  function (req, res) {

    let user = await accountsModel.findByID(req.query.userid);

    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync("1", salt);

    let entity = {userid: user.userid, password};
    let ret = await accountsModel.patch(entity);

    await mailing.sendMailResetPassword(user.email);

    res.redirect('/admin/reset');
});

router.get('/reset-request',async  function (req, res) {

    res.redirect('/admin/reset');
});

export default router;