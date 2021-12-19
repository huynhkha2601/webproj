import {engine} from "express-handlebars";
import sections from "express-handlebars-sections";


export default function(app) {

    app.engine('hbs', engine({
        defaultLayout: 'home.hbs',
        helpers:{
            section: sections()
        }
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

}