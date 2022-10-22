import { UserFields, UserFieldTypes, UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAccountService } from "./IUserAccountService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import * as dotenv from "dotenv";
import { ObjectId, WithId } from "mongodb";
import { WithUserID } from "../../common/commonTypes";
import { UserNotFoundError } from "../../common/errors";
dotenv.config();

// TODO: FIX ADD (ADDS ONLY1)
// TODO: FIX UPDATE (UPDATE BY ID)
// TODO: FIX GET (GET ALL)
// TODO: BETTER ERRORS (PROBABLY CUSTOM ERROR HANDLER)
@injectable()
export class UserAccountService implements IUserAccountService
{
    private _dbAccessService: IDBAccessService;
    private _userCollectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";
    private _eduCollectionName: string = process.env.EDU_COLLECTION_NAME ?? "testEduCol";
    private _workCollectionName: string = process.env.EDU_COLLECTION_NAME ?? "testWorkCol";
    private _aboutMeCollectionName: string = process.env.EDU_COLLECTION_NAME ?? "testAboutmeCol";
    private _locationCollectionName: string = process.env.LOCATION_COLLECTION_NAME ?? "testLocationCol";

    /**
     * @constructor
     * @param {IDBAccessService} dbAccessService - The service used to interact with the DB. 
     */
    public constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        if (this._userCollectionName == "testCol")
            console.warn("Using test user collection, check .env file if this is unexpected.");

        if (this._userCollectionName == "testEduCol")
            console.warn("Using test education info collection, check .env file if this is unexpected.");

        this._dbAccessService = dbAccessService;
    }

    /** 
    * Return the ObjectID from MongoDB corresponding to the username/email of the user in {userIdentifier}. 
    * 
    * @param {UserIdentifier} userIdentifier - The username or email of the user to find
    * 
    * @returns {Promise<string | null>} The hexstring of the user's DB entry if found, null otherwise. 
    */
    private async getUserId(userIdentifier: UserIdentifier): Promise<string>
    {
        let result;
        let id: ObjectId;

        if (userIdentifier.username)
        {
            result = await this._dbAccessService.getCollection(this._userCollectionName,
                { username: { $eq: userIdentifier.username } });
        }
        else if (userIdentifier.email)
        {
            result = await this._dbAccessService.getCollection(this._userCollectionName,
                { email: { $eq: userIdentifier.email } });
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

    /** 
    * Given some user information {userInfo} create a new user in the DB. Return the ObjectID string
    * for the document entry. 
    * 
    * @param {UserInfo} userInfo - The user info to insert.
    * 
    * @returns {Promise<string>} The hexstring of the user's DB entry if found, null otherwise. 
    */
    public async createNewUser(userInfo: UserInfo): Promise<string>
    {
        let result: string | null;
        // TODO: Add checks on valid user info
        result = await this._dbAccessService.createDocument(this._userCollectionName, userInfo);
        return Promise.resolve(result);
    }

    /** 
    * Given some user information (can be partial) {userInfo} and some user identifier {userIdentifier},
    * update that user's information with the data from {userInfo} if it exists. Return the hexstring of
    * the document updated. 
    * 
    * @param {UserInfo} userInfo - The user info to insert.
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * 
    * @returns {Promise<string>} The hexstring of the user's DB entry if found, null otherwise. 
    */
    public async updateUserInfo(userIdentifier: UserIdentifier, userInfo: Object): Promise<string> 
    {
        let id: string | null;
        let result: string | null;

        if (userIdentifier.userID)
            id = userIdentifier.userID;
        else
            id = await this.getUserId(userIdentifier);

        if (id == null)
            throw new UserNotFoundError(userIdentifier);

        result = await this._dbAccessService.updateDocument(this._userCollectionName, id, userInfo);
        return Promise.resolve(result);
    }

    /** 
    * Given some user identifier {userIdentifier}, get the information corresponding to that user.
    * Return the user information if that user is found, null other wise.
    * 
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * 
    * @returns {Promise<string>} The UserInfo corresponding to that user if found, null otherwise. 
    */
    public async getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo>
    {
        let result;

        if (userIdentifier.userID)
        {
            result = await this._dbAccessService.readDocument(this._userCollectionName, userIdentifier.userID);
            return Promise.resolve((result as UserInfo));
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
        else
            throw new Error("User Identifier does not have any of the user identifiers.");

        if (result.length > 1)
            console.warn("There are multiple users for a single user identifier.");
        
        if (result.length == 0)
            throw new UserNotFoundError(userIdentifier);

        return Promise.resolve((result[0] as UserInfo));
    }

    /** 
    * Given some user identifier {userIdentifier}, and a type of information that a user can own {field},
    * return the information requested in {field} corresponding to the user if it exists, null otherwise.
    * 
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * @param {UserFieldTypes} field - The information type requested.
    * 
    * @returns {Promise<UserFields | null>} The UserField requested corresponding to that user if found, null otherwise. 
    * ITS ARRAY ANY?!?!? FIX IT>!!>!>!>!
    */
    public async getUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<Array<any>>
    {
        let result;
        let objectID: string | null;

        if (userIdentifier.userID)
            objectID = userIdentifier.userID;
        else
            objectID = await this.getUserId(userIdentifier);

        if (objectID == null)
            throw new UserNotFoundError(userIdentifier);
            //return Promise.resolve(null);

        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            result = await this._dbAccessService.getCollection(this._eduCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.WORK_INFO:
            result = await this._dbAccessService.getCollection(this._workCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.LOCATION_INFO:
            result = await this._dbAccessService.getCollection(this._locationCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.ABOUTME_INFO:
            result = await this._dbAccessService.getCollection(this._aboutMeCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        default:
            throw new Error("Invalid Field Passed.");
        }
        return Promise.resolve(result);
    }

    /** 
    * Given some user identifier {userIdentifier}, and a type of information that a user can own {field},
    * and some new data {data}, add the information requested in {field} corresponding to the user.
    * 
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * @param {UserFieldTypes} field - The information type requested.
    * 
    * @returns {Promise<string>} The added document's ObjectID hexstring. 
    */
    public async addUserField(userIdentifier: UserIdentifier, field: UserFieldTypes, data: Object): Promise<string>
    {
        let result: string;
        let objectID: string | null;
        let toInsert: WithUserID;
 
        if (userIdentifier.userID)
            objectID = userIdentifier.userID;
        else
            objectID = await this.getUserId(userIdentifier);
 
        if (objectID == null)
            throw new UserNotFoundError(userIdentifier);
        
        toInsert = { userID: ObjectId.createFromHexString(objectID), ...data };
        
        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            result = await this._dbAccessService.createDocument(this._eduCollectionName, toInsert);
            break;
        case UserFieldTypes.WORK_INFO:
            result = await this._dbAccessService.createDocument(this._workCollectionName, toInsert);
            break;
        case UserFieldTypes.ABOUTME_INFO:
            result = await this._dbAccessService.createDocument(this._aboutMeCollectionName, toInsert);
            break;
        case UserFieldTypes.LOCATION_INFO:
            result = await this._dbAccessService.createDocument(this._locationCollectionName, toInsert);
            break;
        default:
            throw new Error("Invalid Field Passed.");
        }

        return Promise.resolve(result);
    }

    /** 
    * Given some ObjectId {objectID}, and a type of information that a user can own {field},
    * and some new data {data}, update the information requested in {field} corresponding to the user if it exists.
    * 
    * @param {string} objectID - The user's username/email/ObjectID.
    * @param {UserFieldTypes} field - The information type requested.
    * @param {Object} data - The data to update with.
    * 
    * @returns {Promise<string>} The updated document's ObjectID hexstring. 
    */
    public async updateUserField(objectID: string, field: UserFieldTypes, data: Object): Promise<string>
    {
        let result: string;

        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            result = await this._dbAccessService.updateDocument(this._eduCollectionName, objectID, data);
            break;
        case UserFieldTypes.WORK_INFO:
            result = await this._dbAccessService.updateDocument(this._workCollectionName, objectID, data);
            break;
        case UserFieldTypes.LOCATION_INFO:
            result = await this._dbAccessService.updateDocument(this._locationCollectionName, objectID, data);
            break;
        case UserFieldTypes.ABOUTME_INFO:
            result = await this._dbAccessService.updateDocument(this._aboutMeCollectionName, objectID ?? "", data);
            break;
        default:
            throw new Error("Invalid Field Passed.");
        }

        return Promise.resolve(result);
    }
    
}