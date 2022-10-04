import { Result } from "../../common/commonTypes";

export interface IDBAccessService
{
    createDocument(collection: string, data: Object): Promise<Result<string>>;
    readDocument(id: string): Promise<Result<Object>>; // Return Data
    //queryDB()
    //updateDocument<T>(id: string, data: T): Promise<string>; // Should return status? not string?
    //deleteDocument(id: string): Promise<string>; // Should return status? not string?
    connect(): Promise<Result<string>>; // Should return status? not string?
    // close() needed?
}