import productsModel from "../models/products.model.js";
import express from "express";

const router = express.Router();
router.get('/add', function(req,res){
    res.render('vwProducts/add',{
        layout: 'admin.hbs'
    });
});

router.post('/add', async function(req,res){
    await productsModel.add(req.body);
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

export default router;