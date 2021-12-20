import upgradesModel from "../models/upgrades.model.js";
import accountsModel from "../models/accounts.model.js";

import express from "express";

const router = express.Router();

router.get('/add', function(req,res){
    res.render('vwUpgrades/add',{
        layout: 'admin.hbs'
    });
});

router.post('/add', async function(req,res){
    await upgradesModel.add(req.body);
    res.render('vwUpgrades/add', {
        layout: 'admin.hbs'
    });
});

router.get('/', async function(req, res){
    const list = await upgradesModel.findAll();
    res.render('vwUpgrades/index',{
        layout: 'admin.hbs',
        upgrades: list
    });
});

router.get('/edit', async function(req, res){
    const uid = req.query.uid || 0;
    const upgrade = await upgradesModel.findByID(uid);
    if (upgrade === null)
        return res.redirect('/admin/types');
    res.render('vwUpgrades/edit',{
        upgrade,
        layout: 'admin.hbs'
    });
})

router.get('/refuse', async function(req, res){
    const uid = req.query.uid || 0;
    const ret = await upgradesModel.del(uid);
    res.redirect('/admin/upgrades');
});

router.get('/accept',async function(req, res){
    const uid = req.query.uid || 0;
    let user ={ userid: req.query.bid, role: 2};
    await accountsModel.patch(user);
    await upgradesModel.del(uid);
    res.redirect('/admin/upgrades');
});

export default router;