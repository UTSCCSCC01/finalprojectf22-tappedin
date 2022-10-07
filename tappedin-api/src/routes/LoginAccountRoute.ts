import express, { Request, Response, NextFunction } from "express";
import { IUserAccountService } from "../services/accountCreationService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../types";
import { LoginInfo, UserInfo } from "../common/userDataTypes";
import { UserIdentifier } from "../common/userDataTypes";

import { Result } from "../common/commonTypes";
import { IUserAuthenticationService } from "../services/UserAuthenticationService/IUserAuthenticationService";
import { id } from "inversify";
import { request } from "http";
import { userInfo } from "os";

export const loginAccountRouter = express.Router();
const userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);
const userAuthenticationService: IUserAuthenticationService = container.get<IUserAuthenticationService>(TYPES.IUserAuthenticationService);


loginAccountRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received Login req");
    try
    {
        // Queries to check if username exists in DB
        let result;
        let userQuery: UserInfo | null;
        userQuery = await userAccountService.getUserInfo({ username: (req.body.LoginInfo as UserInfo).username });
        if (userQuery){
            result = await userAuthenticationService.validateUser(req.body.LoginInfo as LoginInfo, userQuery as UserInfo )
        }
        else{
            res.send(`Username: ${(req.body.LoginInfo as LoginInfo).username} does not exist.`).status(401);
        }
        
        if (result) {
            res.send(result).status(200);
        }
        else{
            res.status(401).send(`Password is incorrect.`);
        }
        // if (userQuery){
        //     // console.log(userQuery)
        //     if(userQuery.password === req.body.LoginInfo.password) {
        //         res.send(userQuery).status(200);
        //         console.log('Login successful')
        //     }
        //     else {
        //         res.status(401).send(`Password is incorrect.`);
        //     }


        // }
        // else {
        //     res.send(`Username: ${(req.body.UserInfo as UserInfo).username} does not exist.`).status(401);
        // }
            
    }
    catch (err)
    {
        next(err);
    }
});
