import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.MYSQL_HOST);
export const database = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "codelife138",
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: "password",
    database: "test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
