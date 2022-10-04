import { RequireAtLeastOne } from "./commonTypes";


export type UserInfo =
{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    dateCreated: Date;
}

type BaseUserIdentifier =
{
    userID?: string;
    username?: string;
    email?: string;
}

export type UserIdentifier = RequireAtLeastOne<BaseUserIdentifier, "username" | "email">;