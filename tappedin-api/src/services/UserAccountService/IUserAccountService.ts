import { UserInfo, UserIdentifier, UserFieldTypes, UserFields } from "../../common/userDataTypes";

export interface IUserAccountService
{
    createNewUser(userInfo: UserInfo): Promise<string>;
    getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo | null>;
    getUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<UserFields | null>;
    //updateUserInfo(userID, fields);
}