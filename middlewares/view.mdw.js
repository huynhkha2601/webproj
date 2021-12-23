import {engine} from "express-handlebars";
import sections from "express-handlebars-sections";
import Handlebars from "handlebars";


export default function(app) {

    app.engine('hbs', engine({
        defaultLayout: 'home.hbs',
        helpers:{
            section: sections(),
            formatMoney(val){
                return  val.toLocaleString('vi', {style : 'currency', currency : 'VND'});
            },
            formatDateTime(d){
                return d.toLocaleString('vi');
            }
        }
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

    Handlebars.registerHelper('limit', function(arr, offset, limit) {
        if(!arr || arr.length == 0)
            return;
        let result = [ ];
        for(let i = offset; i < limit && i < arr.length; ++i)
            result.push(arr[i]);
        return result.join('');
    });

}