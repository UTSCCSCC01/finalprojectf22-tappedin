import { EducationInfo, UserFields, UserFieldTypes, UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAccountService } from "./IUserAccountService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import * as dotenv from "dotenv";
import { ObjectId, WithId } from "mongodb";
dotenv.config();

@injectable()
export class UserAccountService implements IUserAccountService
{
    private _dbAccessService: IDBAccessService;
    private _userCollectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";
    private _eduCollectionName: string = process.env.EDU_COLLECTION_NAME ?? "testEduCol";


    public constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        this._dbAccessService = dbAccessService;
    }

    public async createNewUser(userInfo: UserInfo): Promise<string>
    {
        return this._dbAccessService.createDocument(this._userCollectionName, userInfo);
    }

    public async getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo | null>
    {
        let result;

        if (userIdentifier.userID)
        {
            result = await this._dbAccessService.readDocument(this._userCollectionName, userIdentifier.userID);
            return Promise.resolve((result as UserInfo));
        }
        else if (userIdentifier.username)
            result = await this._dbAccessService.getCollection(this._userCollectionName, { username: { $eq: userIdentifier.username } });
        else if (userIdentifier.email)
            result = await this._dbAccessService.getCollection(this._userCollectionName, { email: { $eq: userIdentifier.email } });
        else
            throw new Error("User Identifier does not have any of the user identifiers.");

        if (result.length > 1)
            console.warn("There are multiple users for a single user identifier.");
        
        if (result.length == 0)
            return Promise.resolve(null);

        return Promise.resolve((result[0] as UserInfo));
    }

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
        case UserFieldTypes.EDUCATIONINFO:
            result = await this._dbAccessService.getCollection(this._eduCollectionName, { userID: { $eq: objectID } });
            // should be flag?
            if (result.length > 1)
                console.warn("There are multiple entries for a single user.");
    
            if (result.length == 0)
                return Promise.resolve(null);

            return (result[0] as EducationInfo);

        default:
            throw new Error("Invalid Field Passed.");
        }
    }

    private async getUserId(userIdentifier: UserIdentifier): Promise<string | null>
    {
        let result;
        let id: ObjectId;

        if (userIdentifier.username)
            result = await this._dbAccessService.getCollection(this._userCollectionName, { username: { $eq: userIdentifier.username } });
        else if (userIdentifier.email)
            result = await this._dbAccessService.getCollection(this._userCollectionName, { email: { $eq: userIdentifier.email } });
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
}