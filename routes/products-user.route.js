import productsModel from "../models/products.model.js";
import auctionModel from "../models/auction.model.js";
import express from "express";

const router = express.Router();


router.get('/byType', async function (req, res) {
    const tid = req.query.type || 0;

    const list = await productsModel.findByType(tid);
    res.render('vwProducts/byType', {
        layout: 'searchProducts.hbs',
        products: list
    });
});

router.get('/byCat', async function (req, res) {
    const cid = req.query.cid || 0;

    const list = await productsModel.findByCat(cid);
    res.render('vwProducts/byCat', {
        layout: 'home.hbs',
        products: list
    });
});

router.get('/detail', async function (req, res) {
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);
    const history = await productsModel.findHistoryProduct(productid);

    if (product === null)
        res.redirect('/');

    res.render('vwProducts/detail', {
        layout: 'home.hbs',
        product, empty: history.length === 0, history
    });
});

router.post('/auction', async function (req, res) {
    let yourMax = parseInt(req.body.max_price);
    let entity = req.query;
    let curPrice = parseInt(entity.price);
    let curDate = new Date();
    let endDate = await productsModel.getEndDate(entity.productid);

    if (curDate.getTime() > new Date(endDate).getTime()){
        // Redirect to view with err_mess
        // CurDate > EndDate, can't biding

    }else{
        if (yourMax >= curPrice + 100000) {
            let curHolder = await productsModel.checkTopID(entity.productid);
            let curMax = await productsModel.getMaxPrice(entity.productid);
            if (curHolder !== -1) {

                if (curHolder === parseInt(entity.idbidder)) {

                    if (yourMax > curMax) {
                        entity.price = curPrice;
                        entity.max_price = yourMax;
                        let rs = await auctionModel.patchWithID(entity);
                        // console.log(true ,4, entity);
                    }

                } else {

                    if (yourMax >= curMax + 100000) {

                        console.log(true ,4);
                        entity.price = curMax + 100000;
                        entity.max_price = yourMax;

                        let rs = await auctionModel.addRecord(entity);
                    } else {
                        entity.price = parseInt(entity.price) + 100000;
                        entity.max_price = yourMax;
                        await auctionModel.addRecord(entity)
                        let update = {
                            idbidder: curHolder, price: yourMax + 100000,
                            max_price: curMax, productid: entity.productid
                        };
                        await auctionModel.addRecord(update);
                    }


                    if (new Date(endDate).getTime() <= curDate.getTime() + 15*60000) {
                        let updateDate = new Date(endDate).getTime()+ 15*60000;
                        let ret = await productsModel.patch({productid: entity.productid, dateend: new Date(updateDate)});
                    }

                }

            } else {
                entity.price = curPrice + 100000;
                entity.max_price = yourMax;
                let rs = await auctionModel.addRecord(entity);
                // console.log(rs);

                if (new Date(endDate).getTime() <= curDate.getTime() + 15*60000) {
                    let updateDate = new Date(endDate).getTime()+ 15*60000;
                    let ret = await productsModel.patch({productid: entity.productid, dateend: new Date(updateDate)});
                }
            }

            // Set new time for endDate


        } else {
            // Redirect to view with err_mess
        }
    }


    res.redirect('/products/detail?productid=' + req.query.productid);

});
export default router;