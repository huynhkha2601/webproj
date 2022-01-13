import db from '../utils/database.js';
// import {RANDOM} from "mysql/lib/PoolSelector";

export default {
    findAll(){
        return db('product');
    },
    findEndProducts(date){
        let sql = 'select * from product ' +
            'where isFinish = 0 and timestampdiff(microsecond,current_timestamp, dateend) < 0'
        return db.raw(sql);
    },
    findRecentProducts(offset){
        return db('product').where('dateend', '>=', new Date().toISOString().slice(0, 19).replace('T', ' '))
            .orderBy('dateend','asc').limit(5).offset(offset);
    },
    findValuestProducts(offset){
        return db('product').where('dateend', '>=', new Date().toISOString())
            .orderBy('price','desc').limit(5).offset(offset);
    },
    findMostBidProducts(offset) {
        let sql = 'select * from product inner join' +
        ' (select productid, count(*) as sl from history' +
        ' group by productid) as t on t.productid = product.productid' +
        ' order by sl desc, datepublished desc limit 5 offset 0';
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
    findHistoryProduct(pid){
        return db('history').where('productid', pid)
            .join('user', {'user.userid': 'history.idbidder'})
            .orderBy('price', 'desc').orderBy('record','desc').limit(5);
    },
    async findQuantityByKeySearch(key){
        let sql = `select count(*) as sl from product where match(productname, title, description) 
            against (\'%${key}%\') and current_timestamp < dateend`;
        let products = await db.raw(sql);
        if (products.length === 0)
            return 0;
        else
            return products[0][0].sl;
    },
    async findProductsByKeySearch(key, offset){
        let sql = `select * from product where match(productname, title, description)
            against (\'%${key}%\') and current_timestamp <= dateend limit 15 offset ${offset}`;
        let products = await db.raw(sql);
        return products[0];
    },
    async findQuantityByType(tid){
        let amount = await db('product').where('type', tid)
            .where('dateend', '>=', new Date().toISOString()).count('* as sl');
        if (amount.length === 0)
            return 0;
        else
            return amount[0].sl;
    },
    findProductSameByType(tid, productid){
        let sql = '';
    },
    findByType(tid, offset){
        return db('product').where('type', tid)
            .where('dateend', '>=', new Date().toISOString())
            .offset(offset).limit(15);
    },
    findByCat(cid){
        return db('product').whereIn('type', db('category')
            .join('type', {'category.cid': 'type.cid'})
            .select('tid').where('category.cid', cid));
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
    },
    async getTopBids(productid){
        let bidder = await db('history').where('productid',productid)
            .orderBy('price','desc').orderBy('record', 'desc').limit(1);
        if(bidder.length === 0)
            return -1;
        else
            return bidder[0];
    },
    async checkTopID(productid){
        let bidder = await db('history').where('productid',productid)
            .orderBy('price','desc').limit(1).select('idbidder')
        if(bidder.length === 0)
            return -1;
        else
            return bidder[0].idbidder;

        },
    async getMaxPrice(productid){
        let maxPrice = await db('history').where('productid',productid).
        orderBy('price','desc').limit(1).select('max_price');
        if(maxPrice.length === 0)
            return -1;
        else
            return maxPrice[0].max_price;
    },
    async getEndDate(productid){
        let endDate = await db('product').where('productid', productid)
            .select('dateend');
        if(endDate.length === 0)
            return -1;
        else
            return endDate[0].dateend;
    },
    async getSeller(productid){
        let endDate = await db('product').where('productid', productid)
            .select('sellerid');
        if(endDate.length === 0)
            return -1;
        else
            return endDate[0].sellerid;
    },
    async getQuantityBid(productid){
        let amount = await db('history').where('productid', productid)
            .count('* as sl');
        if(amount.length === 0)
            return -1;
        else
            return amount[0].sl;
    },
    addBuy(entity){
        return db('listbuy').insert(entity);
    },

}
