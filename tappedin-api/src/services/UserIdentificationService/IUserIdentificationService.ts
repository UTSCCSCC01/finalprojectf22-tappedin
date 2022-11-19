import { UserIdentifier } from "../../common/userDataTypes";

export interface IUserIdentificationService
{
    getUserId(userIdentifier: UserIdentifier): Promise<string>
}