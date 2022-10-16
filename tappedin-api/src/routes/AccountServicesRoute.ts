import express, { Request, Response, NextFunction } from "express";
import { IUserAccountService } from "../services/UserAccountService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../types";
import { UserFieldTypes, UserIdentifier, UserInfo } from "../common/userDataTypes";
import { UserFieldReqType, WithUserIdentifier } from "../common/commonTypes";
import { createUserIdentifier } from "../common/commonFunctions";

export const accountCreationRouter = express.Router();
const userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);


accountCreationRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req for user Field");
    try
    {
        let result;
        let requestBody = req.body.data;
        // TODO: Check if its valid
        let requestUserIdentifier: UserIdentifier = req.body.user as UserIdentifier;
        /*
        Endpoint request should look like:
        {
            "user": {
                "email": "thing@thing.com",
                "username": "tjoeasda"
            },
            "data": {
                data applicable...
            }
        }
        */
        let reqType: UserFieldReqType;
        let fieldType: UserFieldTypes;

        if (!req.query.type)
            res.send("Field request type not specified.").status(400);

        if (!req.query.field)
            res.send("Field type not specified.").status(400);

        if (!Number.isInteger(req.query.type))
            res.send("Field request type is of invalid form.").status(400);
        
        if (!Number.isInteger(req.query.field))
            res.send("Field type is of invalid form.").status(400);

        reqType = parseInt(req.query.type as string);
        fieldType = parseInt(req.query.field as string);

        // TODO: check if  user identifier is valid
        switch (reqType)
        {
        case UserFieldReqType.GET_FIELD:
            result = userAccountService.getUserField(requestUserIdentifier, fieldType);
            break;
        case UserFieldReqType.ADD_FIELD:
            result = userAccountService.addUserField(requestUserIdentifier, fieldType, requestBody);
            break;
        case UserFieldReqType.UPDATE_FIELD:
            result = userAccountService.updateUserField(requestUserIdentifier, fieldType, requestBody);
            break;
        case UserFieldReqType.DELETE_FIELD:
            res.send("DELETE not implemented.").status(400);
            break;
        default:
            res.send("Field request type is invalid.").status(400);
            return;
        }
        res.send(result).status(200);
    }
    catch (err)
    {
        next(err);
    }
});


