import "reflect-metadata";
import logger from "morgan";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { accountCreationRouter } from "./routes/AccoundCreationRoute";
import { accountServicesRouter } from "./routes/AccountServicesRoute";
import { postServiceRouter } from "./routes/PostServiceRoute";
import { friendServiceRouter } from "./routes/FriendServiceRoute";

const app = express();
app.use(logger("dev"));
// Set up CORS policy, may need to change perms later
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/createUser", accountCreationRouter);
app.use("/userFieldServices", accountServicesRouter);
app.use("/postService", postServiceRouter);
app.use("/friendService", friendServiceRouter);

export default app;
