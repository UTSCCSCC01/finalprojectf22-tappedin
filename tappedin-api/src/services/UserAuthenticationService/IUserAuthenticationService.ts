import { UserInfo, UserIdentifier, LoginInfo } from "../../common/userDataTypes";
import { RequireAtLeastOne, Result } from "../../common/commonTypes";

export interface IUserAuthenticationService
{
    validateUser(loginInfo: LoginInfo): Promise<UserInfo | null>;
    
}