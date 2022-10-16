import { UserIdentifier } from "./userDataTypes";

export function createUserIdentifier(obj: any): UserIdentifier
{
    let userIdentifier: UserIdentifier = {};
    if (!obj.hasOwnProperty("email") && !obj.hasOwnProperty("username") && !obj.hasOwnProperty("userID"))
        throw new Error("Object has no properties of UserIdentifier!");
    
    if (obj.hasOwnProperty("email"))
        userIdentifier.email = obj.email;
    
    if (obj.hasOwnProperty("username"))
        userIdentifier.email = obj.username;
    
    if (obj.hasOwnProperty("userID"))
        userIdentifier.email = obj.usrID;

    return userIdentifier;
}