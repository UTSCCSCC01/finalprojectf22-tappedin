import { UserInfo, LoginInfo } from "../../common/userDataTypes";

export interface IUserAuthenticationService
{
    validateUser(loginInfo: LoginInfo): Promise<UserInfo | null>;
}