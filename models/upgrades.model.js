import db from "../utils/database.js";

export default {
    findAll(){
        return db('upgrade');
    },
    async  findByID(id){
        const list = await db('upgrade').where('uid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    add(entity){
        return db('upgrade').insert(entity);
    },
    del(id){
        return db('upgrade').where('uid',id).del();
    },
    patch(entity){
        const id = entity.uid;
        delete entity.uid;
        return db('upgrade').where('uid',id).update(entity);
    }

}
