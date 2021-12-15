import categoriesModel from "../models/categories.model.js";
import express from "express";

const router = express.Router();
router.get('/add', function(req,res){
    res.render('vwCategories/add',{
        layout: 'admin.hbs'
    });
});

router.post('/add', async function(req,res){
    await categoriesModel.add(req.body);
    res.render('vwCategories/add', {
        layout: 'admin.hbs'
    });
});

router.get('/', async function(req, res){
    const categories = await categoriesModel.findAll();
    res.render('vwCategories/index',{
        layout: 'admin.hbs',
        categories: categories
    });
});

router.get('/edit', async function(req, res){
    const cid = req.query.cid || 0;
    const category = await categoriesModel.findByID(cid);
    if (category === null)
        return res.redirect('/admin/categories');
    res.render('vwCategories/edit',{
        category,
        layout: 'admin.hbs'
    });
})

router.post('/del',async function(req, res){
    const ret = await categoriesModel.del(req.body.productid);
    res.render('vwCategories/add',{
        layout: 'admin.hbs',
    });
});
router.post('/patch', async function(req, res){
    const ret = await categoriesModel.patch(req.body);
    res.redirect('/admin/categories');
});

export default router;