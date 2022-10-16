import { UserInfo, UserIdentifier, UserFieldTypes, UserFields } from "../../common/userDataTypes";

export interface IUserAccountService
{
    createNewUser(userInfo: UserInfo): Promise<string>;
    getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo | null>;
    updateUserInfo(userIdentifier: UserIdentifier, data: Object): Promise<string>;
    getUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<UserFields | null>;
    updateUserField(userIdentifier: UserIdentifier, field: UserFieldTypes, data: Object): Promise<string>;
    addUserField(userIdentifier: UserIdentifier, field: UserFieldTypes, data: Object): Promise<string>;
}