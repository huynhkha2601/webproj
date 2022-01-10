import categoriesModel from "../models/categories.model.js";
import typesModel from "../models/types.model.js";


export default function(app){

    app.use(async function (req, res, next){

        if (typeof (req.session.login) == 'undefined'){
            req.session.login = false;
        }

        if (typeof (req.session.user) == 'undefined'){
            req.session.user = null;
        }

        res.locals.login = req.session.login;
        res.locals.User = req.session.user;

        next();
    });

    app.use( async function (req, res, next){
        let categories = await categoriesModel.findAll();
        for (let category of categories) {
            let lst = await typesModel.findTypeByCat(category.cid);
            category.types = lst;
        }

        res.locals.vwCategories = categories;
        res.locals.vwCategories[0].isActive = true;
        next();
    });

}