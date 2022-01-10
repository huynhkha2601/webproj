import productsModel from "../models/products.model.js";
import auctionModel from "../models/auction.model.js";
import express from "express";

const router = express.Router();


router.get('/byType', async function(req, res){
    const tid = req.query.tid || 0;

    const list = await productsModel.findByType(tid);
    res.render('vwProducts/byType',{
        layout: 'home.hbs',
        products: list
    });
});

router.get('/byCat', async function(req, res){
    const cid = req.query.cid || 0;

    const list = await productsModel.findByCat(cid);
    res.render('vwProducts/byCat',{
        layout: 'home.hbs',
        products: list
    });
});

router.get('/detail', async function(req, res){
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);
    const history = await productsModel.findHistoryProduct(productid);

    if (product=== null)
        res.redirect('/');

    res.render('vwProducts/detail',{
        layout: 'home.hbs',
        product, empty: history.length === 0, history
    });
});

router.post('/auction', async function (req, res) {
    let max = req.body.max_price;
    let entity = req.query;
    entity.max_price = max;

    if(parseInt(max) >= parseInt(entity.price) + 100000){

        let idbidder =await productsModel.checkTopID(entity.productid);

        if(idbidder === null)
            idbidder = -1;
        else
            idbidder = idbidder[0].idbidder;

        let maxPrice = await productsModel.getMaxPrice(entity.productid);
        if(maxPrice === null)
            maxPrice = parseInt(entity.max_price) + 100000;
        else
            maxPrice = parseInt(entity.max_price)

        if (parseInt(idbidder ) === parseInt(entity.idbidder)){
            if(parseInt(maxPrice) <= parseInt(entity.max_price))
                await auctionModel.add(entity);
        }else {
            if (parseInt(maxPrice) <= parseInt(entity.max_price)) {
                // entity.price = parseInt(entity.price) +100000;
                entity.price = maxPrice;
                let ret = await auctionModel.add(entity);
                let upret = await productsModel.patch({productid: entity.productid, price: maxPrice})


            }

        }
    }

    res.redirect('/products/detail?productid=' + req.query.productid);

});
export default router;