import db from "../utils/database.js";

export default {
    findAll(){
        return db('rating');
    },
    async  findByID(id){
        const list = await db('rating').where('ratingid',id);
        if(list.length===0)
            return null;
        return list[0];
    },
    async findByUserID(id){
        return db('rating').where('userid',id);
        // if(list.length===0)
        //     return null;
        // return list;
    },
    async findRating(id){
        let rating = await db.raw(`select sum(rate) as diem, count(*) as tong from rating where userid = ${id}`);
        return rating[0][0];
    },
    add(entity){
        return db('rating').insert(entity);
    },
    del(id){
        return db('rating').where('ratingid',id).del();
    },
    patch(entity){
        const id = entity.uid;
        delete entity.uid;
        return db('rating').where('ratingid',id).update(entity);
    }

}
