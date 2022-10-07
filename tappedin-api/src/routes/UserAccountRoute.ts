import express, { Request, Response, NextFunction } from "express";
import { IUserAccountService } from "../services/accountCreationService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../types";
import { UserInfo } from "../common/userDataTypes";

export const accountCreationRouter = express.Router();
const userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);


accountCreationRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req");
    try
    {
        let result: string = await userAccountService.createNewUser(req.body.UserInfo as UserInfo);
        res.send(result).status(200);
    }
    catch (err)
    {
        next(err);
    }
});


