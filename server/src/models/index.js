"use strict";
import { createRequire } from "module";
import Sequelize from "sequelize";
import { database } from "../config/config.js";

const db = {};
let databasecf = database.development;
export const sequelize = new Sequelize(
  databasecf.database,
  databasecf.username,
  databasecf.password,
  databasecf
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
