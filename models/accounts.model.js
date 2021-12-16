import db from "../utils/database.js";

export default {

    async findByUsername(username){
        const obj = await db('user').where('username', username);
        if (obj === 0)
            return null;
        return obj;
    },
    async  findByID(id){
        const list = await db('user').where('userid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    add(entity){
        console.log(entity);
        return db('user').insert(entity);
    },
    del(id){
        return db('user').where('userid',id).del();
    },
    patch(entity){
        const us = entity.username;
        delete entity.username;
        return db('user').where('username',us).update(entity);
    }
}
