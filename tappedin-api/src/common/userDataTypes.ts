import { RequireAtLeastOne } from "./commonTypes";


export interface UserInfo
{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    dateCreated: Date;
}

export interface UserIdentifier
{
    userID?: string;
    username?: string;
    email?: string;
}

//export type UserIdentifier = RequireAtLeastOne<BaseUserIdentifier, "username" | "email">;