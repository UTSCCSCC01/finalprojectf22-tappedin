import { WithId } from "mongodb";
import { UserInfo, UserIdentifier, UserFieldTypes, UserFields } from "../../common/userDataTypes";

export interface IUserAccountService
{
    createNewUser(userInfo: UserInfo): Promise<string>;
    getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo>;
    updateUserInfo(userIdentifier: UserIdentifier, data: Object): Promise<string>;
    getUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<Array<any>>;
    updateUserField(objectID: string, field: UserFieldTypes, data: Object): Promise<string>
    addUserField(userIdentifier: UserIdentifier, field: UserFieldTypes, data: Object): Promise<string>;
    // deleteUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<boolean>;
}