import productsModel from "../models/products.model.js";
import typesModel from "../models/types.model.js";
import express from "express";
import multer from "multer";
import fs from 'fs';

const router = express.Router();

router.get('/add', async function (req, res) {
    const types = await typesModel.findAll();
    res.render('vwProducts/add', {
        layout: 'admin.hbs',
        types
    });
});

router.post('/add', async function (req, res) {
    const ret = await productsModel.add(req.body);

    await fs.access('./public/images/' + ret, (error) => {
        if (error) {
            fs.mkdir('./public/images/' + ret, { recursive: true }, (error) => {
                if (error) {
                    console.log(error);
                }
            });
            fs.mkdir('./public/images/' + ret+'/title', { recursive: true }, (error) => {
                if (error) {
                    console.log(error);
                }
            });
            fs.mkdir('./public/images/' + ret+'/another', { recursive: true }, (error) => {
                if (error) {
                    console.log(error);
                }
            });

            const storage = multer.diskStorage({
                destination: function(req, file, cb){
                    if (file.fieldname === "img") {
                        cb(null, './public/images/' + ret + '/title');
                    } else { // else uploading image
                        cb(null, './public/images/' + ret + '/another');
                    }
                },
                filename: (req, file, cb) => { // naming file
                    cb(null, file.originalname);
                }
            });

            const upload = multer({storage});
            upload.fields([{name:'img', maxCount: 1},{name:'anotherimg',maxCount: 5} ])(req, res, function(err){
                if(err)
                    console.log(err);
                console.log(req.files);
            });
            console.log(req.body)
        } else {
            console.log("Given Directory already exists !!");
        }
    })

    res.render('vwProducts/add', {
        layout: 'admin.hbs'
    });
});

router.get('/', async function (req, res) {
    const list = await productsModel.findAll();
    res.render('vwProducts/index', {
        layout: 'admin.hbs',
        products: list
    });
});

router.get('/edit', async function (req, res) {
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);



    if (product === null)
        return res.redirect('/admin/products');
    res.render('vwProducts/edit', {
        product,
        layout: 'admin.hbs'
    });
})

router.post('/del', async function (req, res) {
    const ret = await productsModel.del(req.body.productid);
    res.render('vwProducts/add', {
        layout: 'admin.hbs',
    });
});
router.post('/patch', async function (req, res) {
    console.log(req.body);
    const ret = await productsModel.patch(req.body);
    res.redirect('/admin/products');
});

export default router;