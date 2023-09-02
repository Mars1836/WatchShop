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
import { default as authRouterDashboard } from "./routes/dashboard/auth.js";
import adminRouter from "./routes/dashboard/admin.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.session_key,
    maxAge: 24 * 60 * 60 * 1000,
    name: "token",
  })
);

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/product", productRouter);
app.use("/api/tag", tagRouter);
app.use("/api/user", userRouter);
app.use("/api/user-profile", verifyAsUser, userProfileRouter);
app.use("/api/order-item", verifyAsUser, OrderItemRouter);
app.use("/api", authRouter);
app.get("/getSession", (req, res) => {
  if (req.session.user) {
    res.send(`Session user: ${req.session.user}`);
  } else {
    res.send("No session found");
  }
});
app.use("/api/dashboard", adminRouter);
app.use("/api/dashboard", authRouterDashboard);
app.use("/", (req, res) => {
  res.send("page not found");
});
db.sequelize
  .sync()
  .then(() => {
    console.log("successed");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
