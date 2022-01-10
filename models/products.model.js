import db from '../utils/database.js';

export default {
    findAll(){
        return db('product');
    },
    findRecentProducts(offset){
        return db('product').where('dateend', '>=', new Date().toISOString())
            .orderBy('dateend','asc').limit(5).offset(offset);
    },
    findValuestProducts(offset){
        return db('product').where('dateend', '>=', new Date().toISOString())
            .orderBy('price','desc').limit(5).offset(offset);
    },
    findMostBidProducts(offset) {
        let sql = 'select * from `product` inner join' +
            ' (select `productid`, count(*) as sl from history' +
            ' group by `productid`) as t on t.productid = product.productid' +
            ' limit 5 offset ' + offset;
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
            .orderBy('price', 'desc').limit(5);
    },
    findByType(tid){
        return db('product').where('type', tid);
    },
    findByCat(cid){
        return db('product').whereIn('type', db('category').join('type', {'category.cid': 'type.cid'})
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

    }


}
