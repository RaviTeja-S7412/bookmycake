var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

function connectToServer(callback) {
    con.connect(function(err) {
        if (err) return callback(err);
        console.log("Connected to MySQL!");
        callback(null);
    });
}

function getDb() {
    return con;
}

module.exports = { connectToServer, getDb };