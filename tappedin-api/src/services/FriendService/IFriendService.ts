import { UserIdentifier } from "../../common/userDataTypes";

export interface IFriendService
{
    addFriend(userIdentifier: UserIdentifier, friendIdentifier: UserIdentifier): Promise<string>;
    /* when friend requests are implemented:
    confirmFriend(userIdentifier: UserIdentifier, friendIdentifier: UserIdentifier): Promise<string>;*/
    /* when DELETE requests are implemented:
    removeFriend(userIdentifier: UserIdentifier, friendIdentifier: UserIdentifier): Promise<string>;*/
    getFriends(userIdentifier: UserIdentifier): Promise<Array<any>>;
}