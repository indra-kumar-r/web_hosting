require("dotenv").config();
const mysql = require("mysql");

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "portfolio",
// });

// db.connect((err) => {
//   if (err) {
//     console.log("Error: ", err);
//     return;
//   }
//   console.log("Connected to the database");
// });

// db.on("error", (err) => {
//   console.error("Databse error: ", err);
//   if (err.code === "PROTOCOL_CONNECTION_ERROR") {
//     console.error("Database connection was closed.");
//   } else {
//     console.error("Unexpected database error.");
//   }
// });

const db = mysql.createConnection(urlDB);

module.exports = db;
