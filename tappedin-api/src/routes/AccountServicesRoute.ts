import express, { Request, Response, NextFunction } from "express";
import { IUserAccountService } from "../services/UserAccountService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../types";
import { UserFieldTypes, UserIdentifier } from "../common/userDataTypes";
import { UserIDType } from "../common/commonTypes";
import { createUserIdentifier } from "../common/commonFunctions";
import { UserNotFoundError } from "../common/errors";

export const accountServicesRouter = express.Router();
const userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);

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
with query field=fieldtype and type=add or update
NEED QUERY!!!
        
*/
accountServicesRouter.post("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req for user Field");
    try
    {
        let result;
        let requestBody = req.body;
        // TODO: Check if its valid
        let requestUserIdentifier: UserIdentifier;
        let fieldType: UserFieldTypes;
        let userID: string;
        let userIDType: UserIDType;
        if (!req.query.field)
            return res.send("Field type not specified.").status(400);

        if (!req.query.idtype)
            return res.send("User ID type not specified.").status(400);
        
        if (!req.query.id)
            return res.send("User ID not specified.").status(400);
        else
            userID = req.query.id.toString();

        userIDType = parseInt(req.query.idtype.toString());
        fieldType = parseInt(req.query.field.toString());

        if (!Number.isInteger(fieldType))
            return res.send("Field type is of invalid form.").status(400);
        
        if (!Number.isInteger(userIDType))
            return res.send("User ID type is of invalid form.").status(400);
        

        requestUserIdentifier = createUserIdentifier(userID, userIDType);
        // TODO: check if  user identifier is valid
        result = await userAccountService.addUserField(requestUserIdentifier, fieldType, requestBody);
        return res.send(result).status(200);
    }
    catch (err)
    {
        next(err);
    }
});

accountServicesRouter.put("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req for user Field");
    try
    {
        let result;
        let requestBody = req.body;
        let fieldType: UserFieldTypes;
        let objectID: string;

        if (!req.query.field)
            return res.status(400).send("Field type not specified.");
        
        fieldType = parseInt(req.query.field.toString());
    
        if (!Number.isInteger(fieldType))
            return res.status(400).send("Field type is of invalid form.");
        
        if (!req.query.objectid)
            return res.status(400).send("Object ID not specified.");
        else
            objectID = req.query.objectid.toString();

        result = await userAccountService.updateUserField(objectID, fieldType, requestBody);
        return res.status(200).send(result);
    }
    catch (err)
    {
        next(err);
    }
});

accountServicesRouter.get("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received GET req for user Field");
    try
    {
        let result;
        // TODO: Check if its valid
        let requestUserIdentifier: UserIdentifier;
        
        let fieldType: UserFieldTypes;
        let userID: string;
        let userIDType: UserIDType;

        if (!req.query.field)
            return res.status(400).send("Field type not specified.");

        if (!req.query.idtype)
            return res.status(400).send("User ID type not specified.");
        
        if (!req.query.id)
            return res.status(400).send("User ID not specified.");
        else
            userID = req.query.id.toString();

        fieldType = parseInt(req.query.field.toString());
        userIDType = parseInt(req.query.idtype.toString());

        if (!Number.isInteger(fieldType))
            return res.status(400).send("Field type is of invalid form.");
        
        if (!Number.isInteger(userIDType))
            return res.status(400).send("User ID type is of invalid form.");

        requestUserIdentifier = createUserIdentifier(userID, userIDType);
        result = await userAccountService.getUserField(requestUserIdentifier, fieldType);
        if (result)
            return res.status(200).send(result);
        else
            return res.status(404).send("Nothing was found for this query.");
    }
    catch (err)
    {
        if (err instanceof UserNotFoundError)
            return res.status(404).send("Nothing was found for this query.");
        else
            next(err);
    }
});

accountServicesRouter.delete("/", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received DELETE req for user Field");
    try
    {
        let result;
        let requestBody = req.body.data;
        // TODO: Check if its valid
        let requestUserIdentifier: UserIdentifier = req.body.user as UserIdentifier;
        let fieldType: UserFieldTypes;

        if (!req.query.field)
            return res.send("Field type not specified.").status(400);
        
        if (!Number.isInteger(req.query.field))
            return res.send("Field type is of invalid form.").status(400);

        fieldType = parseInt(req.query.field.toString());

        return res.send("DELETE not implemented.").status(500);
        //res.send(result).status(200);
    }
    catch (err)
    {
        next(err);
    }
});




