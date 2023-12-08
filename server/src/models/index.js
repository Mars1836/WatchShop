"use strict";

import { createRequire } from "module";
import Sequelize from "sequelize";
import { database } from "../config/config.js";

const db = {};
let databasecf = database.test;
export const sequelize = new Sequelize(
  databasecf.database,
  databasecf.username,
  databasecf.password,
  {
    ...databasecf,
    define: {
      maxKeys: 100, // or your desired number
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
