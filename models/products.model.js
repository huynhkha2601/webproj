// import db from '../utils/db.js';
const list =[
    {productname: 'A', price: 2000},
    {productname: 'B', price: 2000},
    {productname: 'C', price: 2000},{productname: 'D', price: 2000},
    {productname: 'E', price: 2000},
    {productname: 'F', price: 2000},{productname: 'G', price: 2000},
    {productname: 'H', price: 2000},
    {productname: 'I', price: 2000},
    {productname: 'K', price: 2000},
    {productname: 'L', price: 2000}
];


export default {
    addItem(entity){
list.push(entity);
    }
,
    findAll(){
        // return db('product')
        return list;
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
