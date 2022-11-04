import { UserIDType } from "./commonTypes";
import { UserIdentifier } from "./userDataTypes";

export function createUserIdentifier(userID: string, userIDType: UserIDType): UserIdentifier
{
    let userIdentifier: UserIdentifier = {};
    switch(userIDType)
    {
    case UserIDType.USER_ID:
        userIdentifier.userID = userID;
        break;
    case UserIDType.USERNAME:
        userIdentifier.username = userID;
        break;
    case UserIDType.EMAIL:
        userIdentifier.email = userID;
        break;
    case UserIDType.AUTH_ID:
        userIdentifier.authID = userID;
        break;
    default:
        throw new Error("User ID type is invalid.");
    }

    return userIdentifier;
}