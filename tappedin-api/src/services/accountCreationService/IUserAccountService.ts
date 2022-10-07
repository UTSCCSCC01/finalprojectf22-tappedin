import { UserInfo, UserIdentifier } from "../../common/userDataTypes";
import { RequireAtLeastOne, Result } from "../../common/commonTypes";

export interface IUserAccountService
{
    createNewUser(userInfo: UserInfo): Promise<string>;
    getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo>;
    //updateUserInfo(userID, fields);
}