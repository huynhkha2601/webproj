import productsModel from "../models/products.model.js";
import typesModel from "../models/types.model.js";
import express from "express";
import multer from "multer";
import fs from 'fs';
import {dirname} from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const dir ='C:\\Users\\PC\\Documents\\GitHub\\webproj\\routes';
const router = express.Router();

router.get('/add', async function (req, res) {
    const types = await typesModel.findAll();
    let user = req.session.user;
    res.render('vwProducts/add', {
        layout: 'admin.hbs',
        types,
        user
    });
});

router.post('/add', async function (req, res) {

    await fs.access('/public/images/', async (error) => {

        const ret = await productsModel.add(req.body);
        // console.log(ret, __dirname);
        await fs.mkdir('/public/images/' + ret, { recursive: true }, (error) => {
            if (error) {
                console.log(error);
            }
        });
        await fs.access('/public/images/' + ret, (error) => {
            if (error) {
                // fs.mkdir('../public/images/' + ret, { recursive: true }, (error) => {
                //     if (error) {
                //         console.log(error);
                //     }
                // });
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
                            cb(null, '../public/images/' + ret + '/title');
                        } else { // else uploading image
                            cb(null, '../public/images/' + ret + '/another');
                        }
                    },
                    filename: function(req, file, cb){ // naming file
                        // let index = 1;
                        if (file.fieldname === "img") {
                            cb(null, 'main.jpg');
                        }else{
                            cb(null,  '1.jpg');
                            // index++;
                        }
                    }
                });

                const upload = multer({storage});
                upload.fields([{name:'img'},{name:'anotherimg',maxCount: 5} ])(req, res,async function(err){
                    console.log(req.body);
                    let obj = req.body;
                    obj.productid = ret[0];
                    console.log(obj);
                    await productsModel.patch(obj);
                    if(err)
                        console.log(err);
                });

            } else {
                console.log("Given Directory already exists !!");
            }
        })
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


router.get("/edit/api",async function(req,res){
    const productid = req.query.productid || 0;
    // const product = await productsModel.findByID(productid);
    if(productid === 0) {
        res.redirect('/admin/products/edit');
        return;
    }else{
        const titleDir = './public/images/' + productid + '/title';
        const anotherDir = './public/images/' + productid + '/another';
        let title = fs.readdirSync(titleDir, {withFileTypes: true})
            .filter(item=>!item.isDirectory()).map(item => titleDir + '/'+ item.name);
        let another = fs.readdirSync(anotherDir, {withFileTypes: true})
            .filter(item=>!item.isDirectory()).map(item => anotherDir + '/'+ item.name);

        res.json({
            // product,
            title: title[0],
            another})
    }
})

router.get('/edit', async function (req, res) {
    const productid = req.query.productid || 0;
    const product = await productsModel.findByID(productid);

    const titleDir = '/public/images/' + productid + '/title';
    const anotherDir = '/public/images/' + productid + '/another';
    let title = fs.readdirSync( '.' + titleDir, {withFileTypes: true})
        .filter(item=>!item.isDirectory()).map(item => titleDir + '/'+ item.name);
    let another = fs.readdirSync('.' + anotherDir, {withFileTypes: true})
        .filter(item=>!item.isDirectory()).map(item => anotherDir + '/'+ item.name);
    //
    if (product === null)
            return res.redirect('/admin/products');

    res.render('vwProducts/edit', {
        product,
        // , title: title[0], another,
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