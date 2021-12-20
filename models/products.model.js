import db from '../utils/database.js';
import {now} from "date-format";

export default {
    findAll(){
        return db('product');
    },
    findRecentProducts(){
        return db('product').where('dateend', '>=', new Date().toISOString())
            .orderBy('dateend','asc').limit(30);
    },
    findValuestProducts(){
        return db('product').where('dateend', '>=', new Date().toISOString())
            .orderBy('price','desc').limit(30);
    },
    findMostBidProducts() {
        let sql = 'select * from `product` inner join' +
            ' (select `productid`, count(*) as sl from history' +
            ' group by `productid`) as t on t.productid = product.productid' +
            ' limit 30';
        return db.raw(sql);

        // return db('product').join(db('history').select('productid','count(*) as sl').groupBy('productid')
        //     , {productid:'product.productid'});

    },
    async findByID(id){
        const list = await db('product').where('productid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    add(entity){
        return db('product').insert(entity);
    },
    del(id){
        return db('product').where('productid',id).del();
    },
    patch(entity){
        const id = entity.productid;
        delete entity.productid;
        return db('product').where('productid',id).update(entity);
    }
}
