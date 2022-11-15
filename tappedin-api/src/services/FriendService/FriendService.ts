import { UserFields, UserFieldTypes, UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IFriendService } from "./IFriendService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import * as dotenv from "dotenv";
import { ObjectId, WithId } from "mongodb";
import { WithUserID } from "../../common/commonTypes";
import { UserNotFoundError } from "../../common/errors";
import { IUserIdentificationService } from "../UserIdentificationService/IUserIdentificationService";
dotenv.config();


@injectable()
export class FriendService implements IFriendService
{
    private _dbAccessService: IDBAccessService;
    private _userIdentificationService : IUserIdentificationService;

    private readonly _friendCollectionName: string = process.env.FRIEND_COLLECTION_NAME ?? "testFriendCol";

    /**
     * @constructor
     * @param {IDBAccessService} dbAccessService - The service used to interact with the DB. 
     */
    public constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService, 
                       @inject(TYPES.IUserIdentificationService) userIdentificationService: IUserIdentificationService)
    {
        if (this._friendCollectionName == "testFriendCol")
            console.warn("Using test friend collection, check .env file if this is unexpected.");

        this._dbAccessService = dbAccessService;
        this._userIdentificationService = userIdentificationService;
    }

    /** 
    * Given two user ids {userIdentifier} and {friendIdentifier}, add the two users to each others'
    * respective friends list in the DB. Return the ObjectID string for the document entry. 
    * 
    * @param {UserIdentifier} userIdentifier - The first user's username/email/ObjectID.
    * @param {UserIdentifier} friendIdentifier - The second user's username/email/ObjectID.
    * 
    * @returns {Promise<string>} The hexstring of the user's DB entry if found, null otherwise. 
    */
    public async addFriend(userIdentifier: UserIdentifier, friendIdentifier: UserIdentifier): Promise<string>
    {
        let result: string;
        let objectID: string;
        let friendID: string;
        let toInsert: WithUserID;
 
        objectID = await this._userIdentificationService.getUserId(userIdentifier);
        friendID = await this._userIdentificationService.getUserId(friendIdentifier);
        
        toInsert = { userID: ObjectId.createFromHexString(objectID),
            ...{ "friendID" : ObjectId.createFromHexString(friendID) } };

        result = await this._dbAccessService.createDocument(this._friendCollectionName, toInsert);

        return Promise.resolve(result);
    }

    /** 
    * Given some user identifier {userIdentifier}, and a type of information that a user can own {field},
    * return the information requested in {field} corresponding to the user if it exists, null otherwise.
    * 
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * 
    * @returns {Promise<string | null>} The list of that user's friends' DB entries if found, null otherwise. 
    */
    public async getFriends(userIdentifier: UserIdentifier): Promise<any[]>
    {
        let result;
        let objectID: string;

        objectID = await this._userIdentificationService.getUserId(userIdentifier);

        // find entries under both userID and friendID
        result = await this._dbAccessService.getCollection(this._friendCollectionName, 
            { userID: { $eq: ObjectId.createFromHexString(objectID) } });
        result = result.concat(await this._dbAccessService.getCollection(this._friendCollectionName,
            { friendID: { $eq: ObjectId.createFromHexString(objectID) } }));

        return Promise.resolve(result);
    }
}