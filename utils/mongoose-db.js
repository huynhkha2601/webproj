import knexObj from "knex";
import mongoose from "mongoose";

let connection = async (uri, callback) => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connection to database");
    }catch (err){
        console.log(err, "Connect failed!");
    }
}

export default connection;