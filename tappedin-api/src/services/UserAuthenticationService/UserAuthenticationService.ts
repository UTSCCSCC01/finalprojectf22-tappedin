import { Result } from "../../common/commonTypes";
import { UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAuthenticationService } from "./IUserAuthenticationService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";

@injectable()
export class UserAuthenticationService implements IUserAuthenticationService
{
    private dbAccessService: IDBAccessService;
    constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        this.dbAccessService = dbAccessService;
    }

  
}