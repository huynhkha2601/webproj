import {engine} from "express-handlebars";

export default function(app) {

    app.engine('hbs', engine({
        defaultLayout: 'home.hbs'
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

}