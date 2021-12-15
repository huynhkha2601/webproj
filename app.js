import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import managerAccountsRoute from "./routes/manager-accounts.route.js";
import userAccountsRoute from "./routes/user-accounts.route.js";
import productsRoute from "./routes/products.route.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const app = express();
const port = 3000;


app.engine('hbs', engine({defaultLayout:'home.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.urlencoded({
    extended:true
}));

app.use(morgan('dev'));

app.use('/public', express.static('public'));
app.get('/', function (req, res) {
    res.render('home');
})



app.get('/admin', function(req, res) {
    res.render('admin',{layout: 'admin.hbs'});
});

app.get('/register', function(req, res){
    res.render('register', {
        layout: 'accounts.hbs'
    });
})

app.use('/admin/products', productsRoute);
app.use('/admin/manager-accounts', managerAccountsRoute);
app.use('/admin/user-accounts', userAccountsRoute);

app.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
})