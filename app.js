import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import routeMdw from "./middlewares/routes.mdw.js";
import viewMdw from "./middlewares/view.mdw.js";
import sessionMdv from "./middlewares/sessions.mdw.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended:true
}));

sessionMdv(app);
viewMdw(app);
routeMdw(app);

const port = 3000;
app.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
})