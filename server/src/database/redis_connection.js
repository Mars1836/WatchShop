import Redis from "ioredis";
import { createClient } from "redis";

const redisClient = createClient({
  password: "codelife138",
  socket: {
    host: "redis-11904.c8.us-east-1-2.ec2.cloud.redislabs.com",
    port: 11904,
  },
});
redisClient.on("ready", () => {
  console.log("Connected to Redis Labs");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis Labs:", error);
});
await redisClient.connect();

export default redisClient;
