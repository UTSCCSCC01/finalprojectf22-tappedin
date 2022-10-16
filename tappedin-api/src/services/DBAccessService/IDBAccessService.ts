export interface IDBAccessService
{
    createDocument(collectionName: string, data: Object): Promise<string>;
    readDocument(collectionName: string, id: string): Promise<Object | null>;
    getCollection(collectionName: string, filter?: Object): Promise<Array<Object>>;
    updateDocument(collectionName: string, id: string, data: Object): Promise<string>;
    deleteDocument(collectionName: string, id: string): Promise<boolean>;
}