import productsModel from "../models/products.model.js";
import express from "express";

const router = express.Router();
router.get('/add', function(req,res){
    res.render('vwProducts/add',{
        layout: 'admin.hbs'
    });
});

router.post('/add', async function(req,res){
    console.log(req.body);
    const ret = await productsModel.add(req.body);
    res.render('vwProducts/add', {
        layout: 'admin.hbs'
    });
});

router.get('/', async function(req, res){
    const list = await productsModel.findAll();
    res.render('vwProducts/index',{
        layout: 'admin.hbs',
        products: list
    });
});

router.get('/edit', async function(req, res){
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);
    if (product === null)
        return res.redirect('/admin/products');
    res.render('vwProducts/edit',{
        product,
        layout: 'admin.hbs'
    });
})

router.post('/del',async function(req, res){
    const ret = await productsModel.del(req.body.productid);
    res.render('vwProducts/add',{
        layout: 'admin.hbs',
    });
});
router.post('/patch', async function(req, res){
    console.log(req.body);
    const ret = await productsModel.patch(req.body);
    res.redirect('/admin/products');
});

export default router;