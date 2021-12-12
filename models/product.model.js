import db from '../utils/db.js';

export default {
    findAll(){
        return db('product')
    },
    async  findByID(id){
        const list = await db('product').where('productid',id);
        if(list.length()===0)
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
