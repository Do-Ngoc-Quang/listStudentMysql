const mysql = require("mysql");
const config = {
    host: "localhost",
    user: "root",
    password: "babyboi",
    database: "tkweb",
    port: 3305
};
const conn = mysql.createConnection(config);
conn.connect();

function query(sql){
    return new Promise(function(resolve, reject){
        conn.query(sql, function(err, rows, fields){
            if(err){
                return reject(err);
            }
            resolve(rows);
        });
    });
}
module.exports = {
    query,
}