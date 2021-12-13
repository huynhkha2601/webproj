// import db from '../utils/db.js';
const list =[
    { id:1,username: 'A', password: 'a'},
    { id:2,username: 'A', password: 'a'},
    { id:3,username: 'A', password: 'a'},
    { id:4,username: 'A', password: 'a'},
    { id:5,username: 'A', password: 'a'},
    { id:6,username: 'A', password: 'a'},
    { id:7,username: 'A', password: 'a'},
    { id:8,username: 'A', password: 'a'}
];


export default {
    addItem(entity){
        list.push(entity);
    }
    ,
    findAll(){
        // return db('product')
        return list;
    }
    // ,
    // async  findByID(id){
    //     const list = await db('product').where('productid',id);
    //     if(list.length()===0)
    //         return null;
    //     return list[0];
    // },
    // add(entity){
    //     return db('product').insert(entity);
    // },
    // del(id){
    //     return db('product').where('productid',id).del();
    // },
    // patch(entity){
    //     const id = entity.productid;
    //     delete entity.productid;
    //     return db('product').where('productid',id).update(entity);
    // }
}
