var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'bookmycake',
  password: '10FemhDy^9u&gTtp',
  database: 'bookmycake',
  port: 3306
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