import { Result } from "../../common/commonTypes";
import { UserIdentifier, UserInfo } from "../../common/userDataTypes";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserAuthenticationService } from "./IUserAuthenticationService";
import { injectable, inject } from "inversify";
import TYPES from "../../types";

@injectable()
export class UserAuthenticationService implements IUserAuthenticationService
{
    private dbAccessService: IDBAccessService;
    constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService)
    {
        this.dbAccessService = dbAccessService;
    }
    // async validateUser(userInfo: UserInfo): Promise<Result<string>>
    // {
    //     let result: Result<Object>;
    //     let id: string = userInfo.username ?? "0";

    //     result = await this.dbAccessService.readDocument("users", id);
    //     return new Promise((resolve, reject) => 
    //     {
    //         if (result.error)
    //         {
    //             reject({ error: result.error });
    //         }
    //         else if (result.data)
    //         {
    //             resolve({ data: result.data });
    //         }
    //         else
    //         {
    //             reject({ error: new Error("Some error.") });
    //         }
    //     });
    // }

    async getUserInfo(userIdentifier: UserIdentifier): Promise<Result<UserInfo>>
    {
        // const info: UserInfo = {
        //     firstName: "FNAME",
        //     lastName: "LNAME",
        //     password: "PASS",
        //     email: "email",
        //     username: "user",
        //     dateCreated: new Date()
        // };
        let id: string = userIdentifier.userID ?? "0";
        let result: Result<Object> = await this.dbAccessService.readDocument(id);
        return new Promise((resolve, reject) => 
        {
            if (result.error)
            {
                reject({ error: result.error });
            }
            else if (result.data)
            {
                // TODO: CHECK IF UserInfo
                resolve({ data: result.data as UserInfo });
            }
            else
            {
                reject({ error: new Error("Some error.") });
            }
        });
    }

  
}