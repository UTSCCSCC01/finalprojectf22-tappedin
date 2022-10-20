import { injectable } from "inversify";
import { Collection, DeleteResult, MongoClient, ObjectId, UpdateResult, WithId } from "mongodb";
import { IDBAccessService } from "./IDBAccessService";
import * as dotenv from "dotenv";
import { ItemNotFoundError, MongoDBTxError, MongoOperations } from "../../common/errors";
dotenv.config();

@injectable()
export class MongoDBAccessService implements IDBAccessService
{
    private _connectionString: string | undefined = process.env.MONGO_CONNECTION_STRING;
    private _databaseName: string = process.env.DATABASE_NAME ?? "testDB";
    private _client;

    /**
     * @constructor
     */
    public constructor()
    {
        if (!this._connectionString)
            throw new Error("Connection string for Mongo is not defined!");
        if (this._databaseName == "testDB")
            console.warn("Using test Database, check .env file if this is unexpected.");
            
        this._client = new MongoClient(this._connectionString);
    }

    /** 
    * Return the document from MongoDB from the collection {collectionName} corresponding to the
    * hexstring {id} (_id field in MongoDB). 
    * 
    * @param {string} collectionName - The name of the collection to search.
    * @param {string} id - The hexstring corresponding to the ObjectID of the document.
    * 
    * @returns {Promise<Object | null>} The data within the document requested if it exists, null otherwise. 
    */
    public async readDocument(collectionName: string, id: string): Promise<Object> 
    {
        let result: Object;
        await this._client.connect();
        const coll: Collection = this._client.db(this._databaseName).collection(collectionName);

        result = coll.findOne({ _id: ObjectId.createFromHexString(id) }) ?? {};

        if (result)
            return result;
        else
            throw new ItemNotFoundError(id);
    }

    /** 
    * Return an array of documents from MongoDB from the collection {collectionName}. If {filter} is undefined
    * or is an empty object, return the whole collection, otherwise apply the filter to the collection. The filter
    * must follow a proper MongoDB filter.
    * 
    * @param {string} collectionName - The name of the collection to search.
    * @param {string} [filter] - The MongoDB filter to apply to the collection before getting it.
    * 
    * @returns {Promise<Array<Object>>} The array of documents within the collection that pass the filter, if applied.
    *                                   if no documents are found, the array will be empty. 
    */
    public async getCollection(collectionName: string, filter?: Object): Promise<Array<Object>> 
    {
        await this._client.connect();
        const coll = this._client.db(this._databaseName).collection(collectionName);

        if (filter)
            return coll.find(filter).toArray();
        else
            return coll.find().toArray();
    }

    /** 
    * Create a new document in the collection {collectionName} with the data in {data}.
    * Return the hex representation of the ObjectID (the _id field in MongoDB).
    * 
    * @param {string} collectionName - The name of the collection to search.
    * @param {string} data- The data to insert.
    * 
    * @returns {Promise<string>} The hex representation of the ObjectID.
    */
    public async createDocument(collectionName: string, data: Object): Promise<string> 
    {
        await this._client.connect();

        const coll = this._client.db(this._databaseName).collection(collectionName);
        const result = await coll.insertOne(data);

        return new Promise((resolve, reject) => 
        {
            if (result.acknowledged && result.insertedId != null)
                resolve(result.insertedId.toHexString());
            else
                throw new MongoDBTxError(MongoOperations.CREATE);
            
        });
    }

    /** 
    * Update a document given the colletion {collectionName} and hexstring for the 
    * document's ObjectID {id} (the _id field in MongoDB), given it exists. Return the 
    * hexstring for the document that was updated.
    * 
    * @param {string} collectionName - The name of the collection to search.
    * @param {string} data- The data to update the document with.
    * 
    * @returns {Promise<string>} The hex representation of the ObjectID of the document updated.
    */
    public async updateDocument(collectionName: string, id: string, data: Object): Promise<string> 
    {
        await this._client.connect();
        const coll = this._client.db(this._databaseName).collection(collectionName);
        const result: UpdateResult = await coll.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data }); 

        if (result.acknowledged)
            return Promise.resolve(id);
        else if (result.matchedCount == 0)
            throw new ItemNotFoundError(id);
        else
            throw new MongoDBTxError(MongoOperations.UPDATE);
    }

    /** 
    * Delete a document given the colletion {collectionName} and hexstring for the 
    * document's ObjectID {id} (the _id field in MongoDB), given it exists. Return a flag
    * indicating if the delete was successful or not.
    * 
    * @param {string} collectionName - The name of the collection to search.
    * @param {string} id - The hexstring corresponding to the ObjectID of the document.
    * 
    * @returns {Promise<boolean>} True if delete was successful, false otherwise.
    */
    public async deleteDocument(collectionName: string, id: string): Promise<boolean> 
    {
        await this._client.connect();
        const coll = this._client.db(this._databaseName).collection(collectionName);
        const result: DeleteResult = await coll.deleteOne({ _id: ObjectId.createFromHexString(id) }); 

        return Promise.resolve(result.acknowledged);
    }
}