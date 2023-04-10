import express from "express";
import session from "express-session";
import * as dotenv from "dotenv";
import db from "./models/index.js";
import productRouter from "./routes/product.js";
import User from "./models/user.js";
import UserProfile from "./models/user_profile.js";
import tagRouter from "./routes/tag.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import "./utils/passport.js";
import passport from "passport";
import verifyAsUser from "./middlewares/requireAuth.js";
import cors from "cors";
import userProfileRouter from "./routes/user_profile.js";
import OrderItemRouter from "./routes/order.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.session_key,
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/product", productRouter);
app.use("/api/tag", tagRouter);
app.use("/api/user", userRouter);
app.use("/api/user-profile", verifyAsUser, userProfileRouter);
app.use("/api/order-item", verifyAsUser, OrderItemRouter);
app.use("/api", authRouter);
db.sequelize
  .sync()
  .then(() => {
    console.log("successed");
  })
  .catch((err) => {
    console.log(err.message);
  });
