import { Result } from "../../common/commonTypes";
import { UserIdentifier, UserInfo, LoginInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAuthenticationService } from "./IUserAuthenticationService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";

@injectable()
export class UserAuthenticationService implements IUserAuthenticationService
{
    private _dbAccessService: IDBAccessService;
    constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        this._dbAccessService = dbAccessService;
    }
    async validateUser(loginInfo: LoginInfo, userInfo: UserInfo):  Promise<UserInfo | null>
    {
        let result;
        if (loginInfo.username){
            // console.log(userQuery)
            if(loginInfo.password === userInfo.password) {
                console.log('Login successful')
                return Promise.resolve((userInfo as UserInfo));
            }
            else {
                return Promise.resolve(null);
            }

        }
        return Promise.resolve(null)
    }


  
}