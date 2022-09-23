import express from "express";
import addLike from "../testDBController";

const indexRouter = express.Router();

indexRouter.post("/", (req, res) =>
{
    res.send().status(200);
    console.log("Recieved POST req");
    addLike();
});

export default indexRouter;
