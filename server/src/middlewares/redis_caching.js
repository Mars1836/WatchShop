import redisClient from "../database/redis_connection.js";
let i = 0;
async function redisCaching(req, res, next) {
  const cacheKey = req.originalUrl;
  try {
    const dataRaw = await redisClient.get(cacheKey);
    if (!dataRaw) {
      return next();
    }
    const data = JSON.parse(dataRaw);
    res.status(200).json(data);
    console.log("cache");
  } catch (error) {
    next();
    if (error) console.log("caching error: ", error?.message || error);
  }
}
export default redisCaching;
