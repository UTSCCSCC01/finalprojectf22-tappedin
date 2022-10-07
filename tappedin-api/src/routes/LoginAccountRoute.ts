import express, { Request, Response, NextFunction } from "express";
import { IUserAccountService } from "../services/accountCreationService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../types";
import { UserInfo } from "../common/userDataTypes";
import { UserIdentifier } from "../common/userDataTypes";

import { Result } from "../common/commonTypes";
import { IUserAuthenticationService } from "../services/UserAuthenticationService/IUserAuthenticationService";
import { id } from "inversify";
import { request } from "http";

export const loginAccountRouter = express.Router();
const userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);
const userAuthenticationService: IUserAuthenticationService = container.get<IUserAuthenticationService>(TYPES.IUserAuthenticationService);


loginAccountRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received Login req");
    try
    {
        // Queries to check if username exists in DB
        let userQuery: Result<UserInfo> = await userAccountService.getUserInfo(req.body.UserIdentifier); 
        // let result: Result<UserInfo> = await userAuthenticationService.validateUser(req.body.UserIdentifier);
        if (userQuery){
            if(userQuery.data?.password === req.body.password) {
                res.send(userQuery.data).status(200);

            }

        }
            
    }
    catch (err)
    {
        next(err);
    }
});
