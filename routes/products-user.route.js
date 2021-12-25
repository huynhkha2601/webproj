import productsModel from "../models/products.model.js";
import express from "express";

const router = express.Router();


router.get('/byType', async function(req, res){
    const tid = req.query.tid || 0;

    const list = await productsModel.findByType(tid);
    res.render('vwProducts/byType',{
        layout: 'Category.hbs',
        products: list
    });
});

router.get('/byCat', async function(req, res){
    const cid = req.query.cid || 0;

    const list = await productsModel.findByCat(cid);
    res.render('vwProducts/byCat',{
        layout: 'Category.hbs',
        products: list
    });
});

router.get('/detail', async function(req, res){
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);

    if (product=== null)
        res.redirect('/');

    res.render('vwProducts/detail',{
        layout: 'Category.hbs',
        product
    });
});


export default router;