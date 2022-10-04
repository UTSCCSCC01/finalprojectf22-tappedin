import { UserInfo, UserIdentifier } from "../../common/userDataTypes";
import { RequireAtLeastOne, Result } from "../../common/commonTypes";

export interface IUserAccountService
{
    createNewUser(userInfo: UserInfo): Promise<Result<string>>;
    getUserInfo(userIdentifier: RequireAtLeastOne<UserIdentifier>): Promise<Result<UserInfo>>;
    //updateUserInfo(userID, fields);
}