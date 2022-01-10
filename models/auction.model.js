import db from '../utils/database.js';

export default {
    findAll(){
        return db('history')
    },
    async  findByID(historyid){
        const list = await db('history').where('historyid',historyid);
        if(list.length===0)
            return null;
        return list[0];
    }
    ,
    add(entity){
        return db('history').insert(entity);
    },
    del(historyid){
        return db('history').where('historyid',historyid).del();
    },
    patch(entity){
        const id = entity.historyid;
        delete entity.historyid;
        return db('history').where('historyid',id).update(entity);
    },
    patchWithID(entity){
        return db('history').where('idbidder', entity.idbidder)
            .orderBy('price','desc').limit(1).update(entity);
    }
}
