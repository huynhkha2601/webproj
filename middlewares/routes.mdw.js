import accountsRoute from "../routes/accounts.route.js";
import productsRoute from "../routes/products.route.js";
import managerAccountsRoute from "../routes/manager-accounts.route.js";
import userAccountsRoute from "../routes/user-accounts.route.js";
import categoriesRoute from "../routes/categories.route.js";
import typesRoute from "../routes/types.route.js";
import upgradesRoute from "../routes/upgrades.route.js";

import productsModel from "../models/products.model.js";
import {dirname} from "path";
import {fileURLToPath} from "url";

export default function(app) {

    app.get('/', async function (req, res) {

        const firstRecent = await productsModel.findRecentProducts(0); // ok
        const secondRecent = await productsModel.findRecentProducts(5); // ok
        const thirdRecent = await productsModel.findRecentProducts(10); // ok
        const fourthRecent = await productsModel.findRecentProducts(15); // ok

        const firstValuest = await productsModel.findValuestProducts(0); // ok
        const secondValuest = await productsModel.findValuestProducts(5); // ok
        const thirdValuest = await productsModel.findValuestProducts(10); // ok
        const fourthValuest = await productsModel.findValuestProducts(15); // ok

        const firstBids = await productsModel.findMostBidProducts(0);
        const secondBids = await productsModel.findMostBidProducts(5);
        const thirdBids = await productsModel.findMostBidProducts(10);
        const fourthBids = await productsModel.findMostBidProducts(15);

        res.render('home', {
            firstRecent,secondRecent,thirdRecent,fourthRecent,
            firstValuest,secondValuest,thirdValuest,fourthValuest,
            firstBids,secondBids,thirdBids,fourthBids
        });

    });

    app.get('/admin', function (req, res) {
        console.log(req.session.role);
        res.render('admin', {
            layout: 'admin.hbs'
        });

    });

    app.use('/accounts', accountsRoute);
    app.use('/admin/products', productsRoute);
    app.use('/admin/manager-accounts', managerAccountsRoute);
    app.use('/admin/user-accounts', userAccountsRoute);
    app.use('/admin/categories', categoriesRoute);
    app.use('/admin/types', typesRoute);
    app.use('/admin/upgrades', upgradesRoute);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
export function getDirname(){
    return __dirname;
}