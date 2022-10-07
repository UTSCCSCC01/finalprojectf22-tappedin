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
        let resultUser: UserInfo | null;
        let result: string;

        resultUser = await userAccountService.getUserInfo({ username: (req.body.UserInfo as UserInfo).username });
        if (resultUser)
        {
            res.send(`Username: ${(req.body.UserInfo as UserInfo).username} already exists.`).status(400);
            return;
        }
        
        resultUser = await userAccountService.getUserInfo({ email: (req.body.UserInfo as UserInfo).email });
        if (resultUser)
        {
            res.send(`Email: ${(req.body.UserInfo as UserInfo).email} already exists.`).status(400);
            return;
        }

        result = await userAccountService.createNewUser(req.body.UserInfo as UserInfo);
    }
    catch (err)
    {
        next(err);
    }
});


