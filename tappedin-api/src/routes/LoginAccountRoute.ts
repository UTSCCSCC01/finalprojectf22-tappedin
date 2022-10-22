import express, { Request, Response, NextFunction } from "express";
import container from "../inversify.config";
import TYPES from "../types";
import { LoginInfo } from "../common/userDataTypes";
import { IUserAuthenticationService } from "../services/UserAuthenticationService/IUserAuthenticationService";

export const loginAccountRouter = express.Router();
const userAuthenticationService: IUserAuthenticationService = 
    container.get<IUserAuthenticationService>(TYPES.IUserAuthenticationService);


loginAccountRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received Login req");
    try
    {
        let result;
        result = await userAuthenticationService.validateUser(req.body.LoginInfo as LoginInfo);

        if (result) 
        {
            res.send(result).status(200);
        }
        else
        {
            res.status(401).send(`Username ${(req.body.LoginInfo as LoginInfo).username} / Password is incorrect.`);
        }
            
    }
    catch (err)
    {
        next(err);
    }
});
