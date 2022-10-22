import express, { Request, Response, NextFunction } from "express";
import { IUserAccountService } from "../services/UserAccountService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../types";
import { UserInfo } from "../common/userDataTypes";

export const accountCreationRouter = express.Router();
const userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);


accountCreationRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req for create user");
    try
    {
        let resultUser: UserInfo | null;
        let result: string;
        let username: string = (req.body.UserInfo as UserInfo).username ?? "";
        let email: string = (req.body.UserInfo as UserInfo).email ?? "";

        if (username === "")
            return res.send("No username provided.").status(400);
            
        if (email === "")
            return res.send("No email provided.").status(400);

        resultUser = await userAccountService.getUserInfo({ username: username });

        if (resultUser)
            return res.send(`Username: ${username} already exists.`).status(400);
        
        resultUser = await userAccountService.getUserInfo({ email: email });
        if (resultUser)
            return res.send(`Email: ${email} already exists.`).status(400);

        result = await userAccountService.createNewUser(req.body.UserInfo as UserInfo);
        return res.send(result).status(200);
    }
    catch (err)
    {
        next(err);
    }
});


