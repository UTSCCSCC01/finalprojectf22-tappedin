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

    async getUserInfo(userIdentifier: UserIdentifier): Promise<UserInfo>
    {
        let result;

        if (userIdentifier.userID)
            result = await this._dbAccessService.readDocument(this._collectionName, userIdentifier.userID);
        else if (userIdentifier.username)
            result = await this._dbAccessService.getCollection(this._collectionName, { username: userIdentifier.username });
        else if (userIdentifier.email)
            result = await this._dbAccessService.getCollection(this._collectionName, { email: userIdentifier.email });
        else
            throw new Error("User Identifier does not have any of the user identifiers.");


        return Promise.resolve((result as UserInfo));
    }
}