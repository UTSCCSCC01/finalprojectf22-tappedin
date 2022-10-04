import express, { Request, Response } from "express";

const accountCreationRouter = express.Router();

accountCreationRouter.post("/", (req: Request, res: Response) =>
{
    res.send().status(200);
    console.log("Recieved POST req");
});
