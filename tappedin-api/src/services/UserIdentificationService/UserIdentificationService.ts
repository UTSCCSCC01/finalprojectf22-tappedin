import { inject, injectable } from "inversify";
import { ObjectId, WithId } from "mongodb";
import { ItemNotFoundError, UserNotFoundError } from "../../common/errors";
import { UserIdentifier } from "../../common/userDataTypes";
import TYPES from "../../types";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserIdentificationService } from "./IUserIdentificationService";

@injectable()
export class UserIdentificationService implements IUserIdentificationService
{
    private _dbAccessService: IDBAccessService;
    private readonly _userCollectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";

    public constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        this._dbAccessService = dbAccessService;
    }

    /** 
    * Return the ObjectID from MongoDB corresponding to the username/email of the user in {userIdentifier}. 
    * 
    * @param {UserIdentifier} userIdentifier - The username or email of the user to find
    * 
    * @returns {Promise<string | null>} The hexstring of the user's DB entry if found, null otherwise. 
    */
    public async getUserId(userIdentifier: UserIdentifier): Promise<string>
    {
        let result: Array<any>;
        let id: ObjectId;

        if (userIdentifier.userID)
        {
            try
            {
                this._dbAccessService.readDocument(this._userCollectionName, userIdentifier.userID);
                return userIdentifier.userID;
            }
            catch (err)
            {
                if (err instanceof ItemNotFoundError)
                    throw new UserNotFoundError(userIdentifier);
                throw err;
            }
        }
        else if (userIdentifier.username)
        {
            result = await this._dbAccessService.getCollection(this._userCollectionName,
                { username: { $eq: userIdentifier.username } });
        }
        else if (userIdentifier.email)
        {
            result = await this._dbAccessService.getCollection(this._userCollectionName,
                { email: { $eq: userIdentifier.email } });
        }
        else if (userIdentifier.authID)
        {
            result = await this._dbAccessService.getCollection(this._userCollectionName,
                { authID: { $eq: userIdentifier.authID } });
        }
        else
            throw new Error("User Identifier does not have any of the user identifiers.");
 
        if (result.length > 1)
            console.warn("There are multiple users for a single user identifier.");
         
        if (result.length == 0)
            throw new UserNotFoundError(userIdentifier);
 
        if (id = (result[0] as WithId<Document>)._id)
            return Promise.resolve(id.toHexString());
        else
            throw new UserNotFoundError(userIdentifier);
    }
}