// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "smp81ml55r5ksw77",
  password: "h716i8103oz1htb2",
  database: "dbf6hgmmr5w8nftd"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
