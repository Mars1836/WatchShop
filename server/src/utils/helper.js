import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import redisClient from "../database/redis_connection.js";
export function generateJWT(user) {
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token;
}
export function decodeJWT(token) {
  try {
    const ob = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);

    return ob;
  } catch (error) {
    return false;
  }
}
export function handleQueryInput(object) {
  const obj1 = {};
  const obj2 = {};
  for (const [key, value] of Object.entries(object)) {
    if (key.startsWith("_")) {
      continue;
    }
    if (Array.isArray(value)) {
      obj2[key] = { [Op.or]: value };
    } else {
      obj1[key] = value;
    }
  }

  return [obj1, obj2];
}
export async function setCacheRedis(cacheKey, data) {
  redisClient.set(cache, JSON.stringify(data));
}
