import upgradesModel from "../models/upgrades.model.js";
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

router.post('/refuse',async function(req, res){
    const uid = req.query.uid || 0;
    console.log(uid)
    // const ret = await upgradesModel.del(req.body.uid);
    res.render('vwUpgrades/add',{
        layout: 'admin.hbs',
    });
});

router.post('/accept',async function(req, res){

    res.render('vwUpgrades/add',{
        layout: 'admin.hbs',
    });
});

router.post('/patch', async function(req, res){
    const ret = await upgradesModel.patch(req.body);
    res.redirect('/admin/types');
});



export default router;