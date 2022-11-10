import { UserFields, UserFieldTypes, UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAccountService } from "./IUserAccountService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import * as dotenv from "dotenv";
import { ObjectId, WithId } from "mongodb";
import { WithUserID } from "../../common/commonTypes";
import { UserNotFoundError } from "../../common/errors";
import { IUserIdentificationService } from "../UserIdentificationService/IUserIdentificationService";
dotenv.config();


@injectable()
export class UserAccountService implements IUserAccountService
{
    private _dbAccessService: IDBAccessService;
    private _userIdentificationService : IUserIdentificationService;

    private readonly _userCollectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";
    private readonly _eduCollectionName: string = process.env.EDUCATION_COLLECTION_NAME ?? "testEduCol";
    private readonly _workCollectionName: string = process.env.WORK_COLLECTION_NAME ?? "testWorkCol";
    private readonly _socialCollectionName: string = process.env.SOCIAL_COLLECTION_NAME ?? "testSocialCol";
    private readonly _aboutMeCollectionName: string = process.env.ABOUT_ME_COLLECTION_NAME ?? "testAboutmeCol";
    private readonly _interestCollectionName: string = process.env.INTEREST_COLLECTION_NAME ?? "testInterestCol";
    private readonly _locationCollectionName: string = process.env.LOCATION_COLLECTION_NAME ?? "testLocationCol";
    private readonly _coverImageCollectionName: string = process.env.COVER_IMAGE_COLLECTION_NAME ?? "testCoverImageCol";
    private readonly _contactInfoCollectionName: string = process.env.CONTACTINFO_COLLECTION_NAME ?? "testContactInfoCol";

    /**
     * @constructor
     * @param {IDBAccessService} dbAccessService - The service used to interact with the DB. 
     */
    public constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService, 
                       @inject(TYPES.IUserIdentificationService) userIdentificationService: IUserIdentificationService)
    {
        if (this._userCollectionName == "testCol")
            console.warn("Using test user collection, check .env file if this is unexpected.");

        if (this._userCollectionName == "testEduCol")
            console.warn("Using test education info collection, check .env file if this is unexpected.");

        this._dbAccessService = dbAccessService;
        this._userIdentificationService = userIdentificationService;
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
        let id: string;
        let result: string | null;

        id = await this._userIdentificationService.getUserId(userIdentifier);

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
        else if (userIdentifier.authID)
        {
            result = await this._dbAccessService.getCollection(this._userCollectionName, 
                { authID: { $eq: userIdentifier.authID } });
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
    */
    public async getUserField(userIdentifier: UserIdentifier, field: UserFieldTypes): Promise<Array<any>>
    {
        let result;
        let objectID: string;

        objectID = await this._userIdentificationService.getUserId(userIdentifier);

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
        case UserFieldTypes.SOCIAL_INFO:
            result = await this._dbAccessService.getCollection(this._socialCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.INTEREST_INFO:
            result = await this._dbAccessService.getCollection(this._interestCollectionName,
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.ABOUT_ME_INFO:
            result = await this._dbAccessService.getCollection(this._aboutMeCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.COVER_IMAGE_INFO:
            result = await this._dbAccessService.getCollection(this._coverImageCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.CONTACT_INFO:
            result = await this._dbAccessService.getCollection(this._contactInfoCollectionName, 
                { userID: { $eq: ObjectId.createFromHexString(objectID) } });
            break;
        case UserFieldTypes.USER_INFO:
            result = [ await this.getUserInfo(userIdentifier) ];
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
        let objectID: string;
        let toInsert: WithUserID;
 
        objectID = await this._userIdentificationService.getUserId(userIdentifier);
        
        toInsert = { userID: ObjectId.createFromHexString(objectID), ...data };
        
        switch (field)
        {
        case UserFieldTypes.EDUCATION_INFO:
            result = await this._dbAccessService.createDocument(this._eduCollectionName, toInsert);
            break;
        case UserFieldTypes.WORK_INFO:
            result = await this._dbAccessService.createDocument(this._workCollectionName, toInsert);
            break;      
        case UserFieldTypes.SOCIAL_INFO:
            result = await this._dbAccessService.createDocument(this._socialCollectionName, toInsert);
            break;
        case UserFieldTypes.ABOUT_ME_INFO:
            result = await this._dbAccessService.createDocument(this._aboutMeCollectionName, toInsert);
            break;
        case UserFieldTypes.LOCATION_INFO:
            result = await this._dbAccessService.createDocument(this._locationCollectionName, toInsert);
            break;
        case UserFieldTypes.INTEREST_INFO:
            result = await this._dbAccessService.createDocument(this._interestCollectionName, toInsert);
            break;
        case UserFieldTypes.COVER_IMAGE_INFO:
            result = await this._dbAccessService.createDocument(this._coverImageCollectionName, toInsert);
            break;
        case UserFieldTypes.CONTACT_INFO:
            result = await this._dbAccessService.createDocument(this._contactInfoCollectionName, toInsert);
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
        case UserFieldTypes.SOCIAL_INFO:
            result = await this._dbAccessService.updateDocument(this._socialCollectionName, objectID, data);
            break;
        case UserFieldTypes.ABOUT_ME_INFO:
            result = await this._dbAccessService.updateDocument(this._aboutMeCollectionName, objectID ?? "", data);
            break;
        case UserFieldTypes.INTEREST_INFO:
            result = await this._dbAccessService.updateDocument(this._interestCollectionName, objectID ?? "", data);
            break;
        case UserFieldTypes.COVER_IMAGE_INFO:
            result = await this._dbAccessService.updateDocument(this._coverImageCollectionName, objectID, data);
            break;
        case UserFieldTypes.CONTACT_INFO:
            result = await this._dbAccessService.updateDocument(this._contactInfoCollectionName, objectID, data);
            break;
        case UserFieldTypes.USER_INFO:
            result = await this.updateUserInfo({ userID: objectID }, data);
            break;
        default:
            throw new Error("Invalid Field Passed.");
        }

        return Promise.resolve(result);
    }
    
}