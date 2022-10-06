import express, { Request, Response, Router } from "express";
import { IUserAccountService } from "../services/accountCreationService/IUserAccountService";
import container from "../inversify.config";
import TYPES from "../TYPES";

const accountCreationRouter = express.Router();



accountCreationRouter.post("/", (req: Request, res: Response) =>
{
    res.send().status(200);
    console.log("Recieved POST req");
});


export class UserAccountRoute
{
    private _accountCreationRouter: Router = express.Router();
    private _userAccountService: IUserAccountService = container.get<IUserAccountService>(TYPES.IUserAccountService);

    public constructor(userAccountService: IUserAccountService)
    {
        this._userAccountService = userAccountService;
    }

    private configureEndpoints()
    {

    }
}