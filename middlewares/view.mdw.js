import {engine} from "express-handlebars";
import ehbsSections from "express-handlebars-sections";


export default function(app) {

    app.engine('hbs', engine({
        defaultLayout: 'home.hbs',
        helpers:{
            section: ehbsSections()
        }
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

}