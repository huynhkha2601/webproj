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
import nodemailer from "nodemailer";

export default function (app) {

    // app.get('/send-mail', async function (req, res) {
    //     let testAccount = await nodemailer.createTestAccount();
    //     // email transporter
    //
    //     let transporter = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: "smtp.gmail.com", // generated ethereal user
    //             pass: 'bjnjucun', // generated ethereal password
    //         },
    //     });
    //
    //     // send mail with defined transport object
    //     await transporter.sendMail({
    //         from: 'huynhkha2601@gmail.com', // sender address
    //         to: "htkha19@clc.fitus.edu.vn", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>"
    //     }).then(info => {
    //         console.log({info});
    //     }).catch(console.error);
    //     ;
    //
    //     res.render('home');
    // })
    //
    app.get('/', async function (req, res) {

        const Recent = await productsModel.findRecentProducts(0); // o
        const Valuest = await productsModel.findValuestProducts(0); // ok
        const Bids = await productsModel.findMostBidProducts(0);

        res.render('home', {
            Recent, Valuest, Bids: Bids[0],
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
    app.use('/products', productsUserRoute);
    app.use('/accounts/profile', accountsProfileRoute);
}
//
// const __dirname = dirname(fileURLToPath(import.meta.url));
// export function getDirname(){
//     return __dirname;
// }