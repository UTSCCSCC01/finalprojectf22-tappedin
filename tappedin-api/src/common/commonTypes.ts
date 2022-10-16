import { UserIdentifier } from "./userDataTypes";

export type WithUserID<T> =
{
    userID: string,
    data: T
};

export type WithUserIdentifier<T> =
{
    userIdentifier: UserIdentifier,
    data: T
};

export enum UserFieldReqType
{   
    GET_FIELD = 0,
    ADD_FIELD = 1,
    UPDATE_FIELD = 2,
    DELETE_FIELD = 3
}