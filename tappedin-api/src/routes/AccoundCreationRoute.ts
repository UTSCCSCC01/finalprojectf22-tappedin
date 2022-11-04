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
        let username: string | undefined = req.body.username;
        let email: string | undefined = req.body.email;

        if (!username)
            return res.status(400).send("No username provided.");
            
        if (!email)
            return res.status(400).send("No email provided.");
        try
        {
            resultUser = await userAccountService.getUserInfo({ username: username });
            if (resultUser)
                return res.status(400).send(`Username: ${username} already exists.`);
        }
        catch {}

        try
        {
            resultUser = await userAccountService.getUserInfo({ email: email });
            if (resultUser)
                return res.status(400).send(`Email: ${email} already exists.`);
        }
        catch {}

        result = await userAccountService.createNewUser(req.body as UserInfo);
        return res.status(200).send(result);
    }
    catch (err)
    {
        next(err);
    }
});


