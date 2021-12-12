import mysql from "mysql2";
import {Query} from "mysql-easy-query";

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "qldg"
});


export default conn;