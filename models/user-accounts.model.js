import db from "../utils/database.js";

export default {
    findAll(value){
        return db('user').where('role', value);
    },
    async  findByID(id){
        const list = await db('user').where('userid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    add(entity){
        return db('user').insert(entity);
    },
    del(id){
        return db('user').where('userid',id).del();
    },
    patch(entity){
        const id = entity.userid;
        delete entity.userid;
        return db('user').where('userid',id).update(entity);
    },
    getFavList(id){
        return db('favorites').where('userid',id).
            join('product',{'favorites.pid':'product.productid'});
    },
    favProduct(entity){
        return db('favorites').insert(entity);
    },
    unfavProduct(fid){
        return db('favorites').where('favid',fid).del();
    },
    getCurBidingList(id){
        return db('history').where('idbidder',id)
            .join('product',{'history.productid':'product.productid'})
            .where('dateend', '>=', new Date().toISOString());
    },
    getWonList(id){
        return db('listbuy').join('product', {'listbuy.productid':'product.productid'})
            .where('bidderid', id);
    },
    async isAuction(id){
        let rating = await db.raw(`select sum(rate) as diem, count(*) as tong from rating where userid = ${id}`);
        return rating[0][0];
    }
}
