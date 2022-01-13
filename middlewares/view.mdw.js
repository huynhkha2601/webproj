import {engine} from "express-handlebars";
import sections from "express-handlebars-sections";
import morgan from "morgan";


export default function (app) {

    app.use(morgan('dev'));
    app.engine('hbs', engine({
        defaultLayout: 'home.hbs',
        helpers: {
            section: sections(),
            increase(val){
                return parseInt(val)+1;
            },
            formatName(val){
                let str = val.split(' ');
                return "****" + str[str.length-1];
            },
            formatMoney(val) {
                return val.toLocaleString('vi', {
                    style: 'currency', currency: 'VND'
                });
            },
            formatPassword(val) {
                let password = "";
                for (let i = 0; i < 20; i++) {
                    password += "*";
                }
                return password;
            },
            formatDate(d) {
                return new Date(d).toDateString();
            },
            formatDateTime(d) {
                return d.toLocaleString('vi');
            },
            equal(variable, value) {
                return parseInt(variable) === parseInt(value);
            },
            formatPoint(val) {
                return val + '%';
            },
            isPos(val){
                if (parseInt(val) > 0)
                    return true;
                else if (parseInt(val) < 0)
                    return false;
            }
        }
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

}