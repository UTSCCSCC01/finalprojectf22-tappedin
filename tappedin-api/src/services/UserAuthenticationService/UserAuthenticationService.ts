import { Result } from "../../common/commonTypes";
import { UserIdentifier, UserInfo, LoginInfo } from "../../common/userDataTypes";
import { IUserAccountService } from "../accountCreationService/IUserAccountService";
import { IUserAuthenticationService } from "./IUserAuthenticationService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";

@injectable()
export class UserAuthenticationService implements IUserAuthenticationService
{
    private _userAccountService: IUserAccountService;
    constructor(@inject(TYPES.IUserAccountService) userAccountService: IUserAccountService)
    {
        this._userAccountService = userAccountService;
    }
    async validateUser(loginInfo: LoginInfo):  Promise<UserInfo | null>
    {
        let userInfo: UserInfo | null;
        userInfo = await this._userAccountService.getUserInfo({ username: (loginInfo as UserInfo).username });
        // console.log(userInfo)
        if (userInfo){
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