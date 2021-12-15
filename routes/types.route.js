import typesModel from "../models/types.model.js";
import express from "express";

const router = express.Router();
router.get('/add', function(req,res){
    res.render('vwTypes/add',{
        layout: 'admin.hbs'
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
    if (type === null)
        return res.redirect('/admin/types');
    res.render('vwTypes/edit',{
        type,
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