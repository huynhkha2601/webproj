import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const app = express();
const port = 3000;

app.engine('hbs', engine({defaultLayout:'bs4.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.render('home');
})
app.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
})