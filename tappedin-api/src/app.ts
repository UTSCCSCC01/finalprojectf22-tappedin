import "reflect-metadata";
import logger from "morgan";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { accountCreationRouter } from "./routes/UserAccountRoute";
import { loginAccountRouter } from "./routes/LoginAccountRoute";

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
app.use("/login", loginAccountRouter);

export default app;
