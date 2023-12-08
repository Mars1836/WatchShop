// import mysql from "mysql";

// export function connect() {
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: process.env.database_pw,
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   });
//   connection.connect(function (err) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//       return;
//     }

//     console.log("connected as id " + connection.threadId);
//   });
// }
