import accountsRoute from "../routes/accounts.route.js";
import productsRoute from "../routes/products.route.js";
import managerAccountsRoute from "../routes/manager-accounts.route.js";
import userAccountsRoute from "../routes/user-accounts.route.js";
import categoriesRoute from "../routes/categories.route.js";
import typesRoute from "../routes/types.route.js";
import upgradesRoute from "../routes/upgrades.route.js";
import productsModel from "../models/products.model.js";
import format, {ISO8601_FORMAT} from "date-format";

export default function(app) {

    app.get('/', async function (req, res) {
        const recentProducts = await productsModel.findRecentProducts(); // ok
        const valuestProducts = await productsModel.findValuestProducts(); // ok
        const mostBidProducts = await productsModel.findMostBidProducts();
        console.log(mostBidProducts[0]);

        res.render('home', {
            recentProducts,
            valuestProducts
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