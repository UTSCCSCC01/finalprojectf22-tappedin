import { UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAccountService } from "./IUserAccountService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import * as dotenv from "dotenv";
dotenv.config();

@injectable()
export class UserAccountService implements IUserAccountService
{
    private _dbAccessService: IDBAccessService;
    private _collectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";


    constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        this._dbAccessService = dbAccessService;
    }

    async createNewUser(userInfo: UserInfo): Promise<string>
    {
        return this._dbAccessService.createDocument(this._collectionName, userInfo);
    }

    async getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo | null>
    {
        let result;

        if (userIdentifier.userID)
        {
            result = await this._dbAccessService.readDocument(this._collectionName, userIdentifier.userID);
            return Promise.resolve((result as UserInfo));
        }
        else if (userIdentifier.username)
            result = await this._dbAccessService.getCollection(this._collectionName, { username: { $eq: userIdentifier.username } });
        else if (userIdentifier.email)
            result = await this._dbAccessService.getCollection(this._collectionName, { email: { $eq: userIdentifier.email } });
        else
            throw new Error("User Identifier does not have any of the user identifiers.");

        if (result.length > 1)
            console.warn("There are multiple users for a single user identifier.");
        
        if (result.length == 0)
            return Promise.resolve(null);

        return Promise.resolve((result[0] as UserInfo));
    }
}