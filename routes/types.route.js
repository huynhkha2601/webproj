import typesModel from "../models/types.model.js";
import categoriesModel from "../models/categories.model.js";

import express from "express";

const router = express.Router();
router.get('/add', async function(req,res){
    const categories = await categoriesModel.findAll();
    res.render('vwTypes/add',{
        layout: 'admin.hbs',
        categories
    });
});

router.post('/add', async function(req,res){
    await typesModel.add(req.body);
    res.render('vwTypes/add', {
        layout: 'admin.hbs'
    });
});

router.get('/', async function(req, res){
    const list = await typesModel.findAll();
    res.render('vwTypes/index',{
        layout: 'admin.hbs',
        types: list
    });
});

router.get('/edit', async function(req, res){
    const tid = req.query.tid || 0;
    const type = await typesModel.findByID(tid);
    const categories = await categoriesModel.findAll();

    if (type === null)
        return res.redirect('/admin/types');
    res.render('vwTypes/edit',{
        type,
        categories,
        layout: 'admin.hbs'
    });
})

router.post('/del',async function(req, res){
    const ret = await typesModel.del(req.body.tid);
    res.render('vwTypes/add',{
        layout: 'admin.hbs',
    });
});

router.post('/patch', async function(req, res){
    const ret = await typesModel.patch(req.body);
    res.redirect('/admin/types');
});

export default router;