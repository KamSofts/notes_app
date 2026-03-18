const mysql = require('mysql2/promise');

const db = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE
});

db.getConnection().then((connection)=>{
    console.log(`Connected`);
    connection.release();
}).catch((error)=>{
    console.log(`Error : `, error.message);
});

module.exports = db;