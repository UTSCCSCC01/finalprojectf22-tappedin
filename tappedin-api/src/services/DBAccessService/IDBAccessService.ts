export interface IDBAccessService
{
    createDocument(collectionName: string, data: Object): Promise<string>;
    readDocument(collectionName: string, id: string): Promise<Object>; // Return Data
    getCollection(collectionName: string, filter?: Object): Promise<Array<Object>>;
    //updateDocument<T>(id: string, data: T): Promise<string>; // Should return status? not string?
    //deleteDocument(id: string): Promise<string>; // Should return status? not string?
    // no need to explicitly call close/connect, should do for every call.
    // connect(): Promise<Result<string>>; // Should return status? not string?
    // close() needed?
}