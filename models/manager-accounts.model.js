import db from "../utils/database.js";

export default {
    findAll(){
        return db('user').where('role', 1);
    }
    ,
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
    }
}
