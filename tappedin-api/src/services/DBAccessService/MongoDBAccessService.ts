import { injectable } from "inversify";
import { Collection, MongoClient, ObjectId } from "mongodb";
import { IDBAccessService } from "./IDBAccessService";
import * as dotenv from "dotenv";
dotenv.config();

@injectable()
export class MongoDBAccessService implements IDBAccessService
{
    private _connectionString: string | undefined = process.env.MONGO_CONNECTION_STRING;
    private _databaseName: string = process.env.DATABASE_NAME ?? "testDB";
    private _client;


    public constructor()
    {
        if (!this._connectionString)
            throw new Error("Connection string for Mongo is not defined!");
        if (this._databaseName == "testDB")
            console.warn("Using test Database, check .env file if this is unexpected.");
            
        this._client = new MongoClient(this._connectionString);
    }

    public async readDocument(collectionName: string, id: string): Promise<Object> 
    {
        try
        {
            await this._client.connect();
            const coll: Collection = this._client.db(this._databaseName).collection(collectionName);

            const result = await coll.findOne({ _id: ObjectId.createFromHexString(id) }) ?? {};

            return new Promise((resolve) =>
            {
                resolve(result);
            });
        }
        finally
        {
            await this._client.connect();
        }
    }

    public async getCollection(collectionName: string, filter?: Object): Promise<Array<Object>> 
    {
        try
        {
            await this._client.connect();
            const coll = this._client.db(this._databaseName).collection(collectionName);

            if (filter)
                return coll.find(filter).toArray();
            else
                return coll.find().toArray();
        }
        finally
        {
            await this._client.connect();
        }
    }

    public async createDocument(collectionName: string, data: Object): Promise<string> 
    {
        try
        {
            await this._client.connect();
            const coll = this._client.db(this._databaseName).collection(collectionName);

            const result = await coll.insertOne(data);

            return new Promise((resolve, reject) => 
            {
                if (result.acknowledged && result.insertedId != null)
                    resolve(result.insertedId.toHexString());
                else
                    reject("Something went wrong inserting into the collection.");
                
            });
        }
        finally
        {
            await this._client.connect();
        }
    }
}