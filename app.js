import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import accountsModel from "./models/accounts.model.js";


import productsModel from "./models/products.model.js";




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



app.get('/admin/products/add', function(req,res){
    res.render('vwProducts/add');
});

app.post('/admin/products/add', function(req,res){
    console.log(req.body);
    productsModel.addItem(req.body);
    res.render('vwProducts/add');
});

app.get('/admin/products', function(req, res){
    const list = productsModel.findAll();
    res.render('vwProducts/index',{
        products: list
    });
});


app.get('/admin/accounts', function(req, res){
    const accountList = accountsModel.findAll();
    res.render('vwAccounts/index', {
        accounts: accountList
    });
})

app.get('/admin/accounts/add', function(req, res){
    res.render('vwAccounts/add');
});

app.post('/admin/accounts/add', function(req, res){
    console.log(req.body);
    accountsModel.addItem(req.body);
    res.render('vwAccounts/add');
});


app.get('/admin', function(req, res) {
    res.render('admin',{layout: 'admin.hbs'});
});

app.get('/register', function(req, res){
    res.render('register', {
        layout: 'accounts.hbs'
    });
})

app.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
})