import { ObjectId } from "mongodb";
import { UserIdentifier } from "./userDataTypes";

export interface WithUserID
{
    userID: ObjectId
};

// export enum UserFieldReqType
// {   
//     ADD_FIELD = 0,
//     UPDATE_FIELD = 1,
// }

export enum UserIDType
{   
    USER_ID = 0,
    USERNAME = 1,
    EMAIL = 2
}