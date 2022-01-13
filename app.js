import express from 'express';
import morgan from 'morgan';
import cron from "node-cron";

// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import joi from "joi";
// import mailer from "nodemailer";

import localMdw from "./middlewares/locals.mdw.js"
import routeMdw from "./middlewares/routes.mdw.js";
import viewMdw from "./middlewares/view.mdw.js";
import sessionMdv from "./middlewares/sessions.mdw.js";

import productsModel from "./models/products.model.js";


const app = express();

app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));

sessionMdv(app);
viewMdw(app);
localMdw(app);
routeMdw(app);

cron.schedule('* * * * * *', async ()=>{
    // let
},{
    schuduled: true
});


const port = 3000;
app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
})