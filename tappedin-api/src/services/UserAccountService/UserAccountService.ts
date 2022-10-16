import { EducationInfo, UserFields, UserFieldTypes, UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAccountService } from "./IUserAccountService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import * as dotenv from "dotenv";
import { ObjectId, WithId } from "mongodb";
import { WithUserID } from "../../common/commonTypes";
dotenv.config();

@injectable()
export class UserAccountService implements IUserAccountService
{
    private _dbAccessService: IDBAccessService;
    private _userCollectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";
    private _eduCollectionName: string = process.env.EDU_COLLECTION_NAME ?? "testEduCol";

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
    private async getUserId(userIdentifier: UserIdentifier): Promise<string | null>
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
            return Promise.resolve(null);

        if (id = (result[0] as WithId<Document>)._id)
            return Promise.resolve(id.toHexString());
        else
            return Promise.resolve(null);
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
        // TODO: Add checks on valid user info
        return this._dbAccessService.createDocument(this._userCollectionName, userInfo);
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

        if (userIdentifier.userID)
            id = userIdentifier.userID;
        else
            id = await this.getUserId(userIdentifier);

        if (id == null)
            throw new Error("User to update not found!");

        return this._dbAccessService.updateDocument(this._userCollectionName, id, userInfo);
    }

    /** 
    * Given some user identifier {userIdentifier}, get the information corresponding to that user.
    * Return the user information if that user is found, null other wise.
    * 
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * 
    * @returns {Promise<string>} The UserInfo corresponding to that user if found, null otherwise. 
    */
    public async getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo | null>
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
            return Promise.resolve(null);

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
    */
    public async getUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<UserFields | null>
    {
        let result;
        let objectID: string | null;

        if (userIdentifier.userID)
            objectID = userIdentifier.userID;
        else
            objectID = await this.getUserId(userIdentifier);

        if (objectID == null)
            throw new Error("UserID cannot be found!");

        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            result = await this._dbAccessService.getCollection(this._eduCollectionName, { userID: { $eq: objectID } });
            // should be flag?
            if (result.length > 1)
                console.warn("There are multiple entries for a single user.");
    
            if (result.length == 0)
                return Promise.resolve(null);

            return Promise.resolve(result[0] as EducationInfo);

        default:
            throw new Error("Invalid Field Passed.");
        }
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
        let toInsert: WithUserID<Object>;
 
        if (userIdentifier.userID)
            objectID = userIdentifier.userID;
        else
            objectID = await this.getUserId(userIdentifier);
 
        if (objectID == null)
            throw new Error("UserID cannot be found!");
        
        toInsert = { userID: objectID, data: data }; 
 
        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            // TODO: Check if the information exists already + if its valid.
            return this._dbAccessService.createDocument(this._eduCollectionName, toInsert);
 
        default:
            throw new Error("Invalid Field Passed.");
        }
    }

    /** 
    * Given some user identifier {userIdentifier}, and a type of information that a user can own {field},
    * and some new data {data}, update the information requested in {field} corresponding to the user if it exists.
    * 
    * @param {UserIdentifier} userIdentifier - The user's username/email/ObjectID.
    * @param {UserFieldTypes} field - The information type requested.
    * 
    * @returns {Promise<string>} The updated document's ObjectID hexstring. 
    */
    public async updateUserField(userIdentifier: UserIdentifier, field: UserFieldTypes, data: Object): Promise<string>
    {
        let result: string;
        let objectID: string | null;

        if (userIdentifier.userID)
            objectID = userIdentifier.userID;
        else
            objectID = await this.getUserId(userIdentifier);

        if (objectID == null)
            throw new Error("UserID cannot be found!");

        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            return this._dbAccessService.updateDocument(this._eduCollectionName, objectID, data);

        default:
            throw new Error("Invalid Field Passed.");
        }
    }

    
}