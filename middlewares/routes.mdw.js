import accountsRoute from "../routes/accounts.route.js";
import productsRoute from "../routes/products.route.js";
import managerAccountsRoute from "../routes/manager-accounts.route.js";
import userAccountsRoute from "../routes/user-accounts.route.js";
import categoriesRoute from "../routes/categories.route.js";
import typesRoute from "../routes/types.route.js";
import upgradesRoute from "../routes/upgrades.route.js";
import productsUserRoute from "../routes/products-user.route.js"
import accountsProfileRoute from "../routes/accounts-profile.js";
import viewRoute from "../routes/view.route.js"


import productsModel from "../models/products.model.js";
import {dirname} from "path";
import {fileURLToPath} from "url";

export default function(app) {

    app.get('/', async function (req, res) {

        const Recent = await productsModel.findRecentProducts(0); // o
        const Valuest = await productsModel.findValuestProducts(0); // ok
        const Bids = await productsModel.findMostBidProducts(0);

        if(req.session.user !== null)
            console.log(req.session.user.role, typeof (req.session.user.role),
                req.session.user.role === '3');
        res.render('home', {
            Recent,Valuest,Bids,
            login: req.session.login,
            user: req.session.user
        });

    });

    app.get('/admin', function (req, res) {
        res.render('admin', {
            layout: 'admin.hbs'
        });
    });
    app.use('/', viewRoute);
    app.use('/accounts', accountsRoute);
    app.use('/admin/products', productsRoute);
    app.use('/admin/manager-accounts', managerAccountsRoute);
    app.use('/admin/user-accounts', userAccountsRoute);
    app.use('/admin/categories', categoriesRoute);
    app.use('/admin/types', typesRoute);
    app.use('/admin/upgrades', upgradesRoute);
    app.use('/products',productsUserRoute);
    app.use('/accounts/profile', accountsProfileRoute);
}
//
// const __dirname = dirname(fileURLToPath(import.meta.url));
// export function getDirname(){
//     return __dirname;
// }