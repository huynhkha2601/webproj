import db from "../utils/database.js";

export default {
    async findByEmail(email){
        const obj = await db('user').where('email', email);
        if (obj.length === 0)
            return null;
        return obj[0];
    },
    async findByUsername(username){
        const obj = await db('user').where('username', username);
        if (obj.length === 0)
            return null;
        return obj[0];
    },
    async  findByID(id){
        const list = await db('user').where('userid',id);
        if(list.length === 0)
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
    findAllRequest(){
        return db('resetpw');
    },
    addRequest(entity){
        return db('resetpw').insert(entity);
    },
    delRequest(id){
        return db('resetpw').where('rid',id).del();
    },
}
