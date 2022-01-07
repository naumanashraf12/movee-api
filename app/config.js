"user strict";
var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "phooni-internal-ireland.c4jh6yuhd6jw.eu-west-1.rds.amazonaws.com",
  user: "apimovee",
  password: "xDfwx7fV3QAK73SQ5ypVNjJ",
  database: "apimovee",
});

connection.connect(function (err) {
  if (err) console.log(err.message);
  else console.log("Connected to DB!");
});

module.exports = connection;
