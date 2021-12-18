import accountsRoute from "../routes/accounts.route.js";
import productsRoute from "../routes/products.route.js";
import managerAccountsRoute from "../routes/manager-accounts.route.js";
import userAccountsRoute from "../routes/user-accounts.route.js";
import categoriesRoute from "../routes/categories.route.js";
import typesRoute from "../routes/types.route.js";
import upgradesRoute from "../routes/upgrades.route.js";


export default function(app) {

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/admin', function (req, res) {
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