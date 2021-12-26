import db from '../utils/database.js';

export default {
    findAll(){
        return db('type')
    },
    async  findByID(id){
        const list = await db('type').where('tid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    findTypeByCat(cid){
        return db('type').where('cid', cid);
    }
    ,
    add(entity){
        return db('type').insert(entity);
    },
    del(id){
        return db('type').where('tid',id).del();
    },
    patch(entity){
        const id = entity.tid;
        delete entity.tid;
        return db('type').where('tid',id).update(entity);
    }
}
