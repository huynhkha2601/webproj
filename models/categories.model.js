import db from '../utils/database.js';

export default {
    findAll(){
        return db('category')
    },
    findType(cid){
        return db('category').join('type', {'category.cid':'type.cid'})
            .where('category.cid', cid);
        // .select('tid');
    },
    async  findByID(id){
        const list = await db('category').where('cid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    add(entity){
        return db('category').insert(entity);
    },
    del(id){
        return db('category').where('cid',id).del();
    },
    patch(entity){
        const id = entity.cid;
        delete entity.cid;
        return db('category').where('cid',id).update(entity);
    }
}
