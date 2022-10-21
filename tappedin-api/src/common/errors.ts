import { UserIdentifier } from "./userDataTypes";

export enum ErrorCodes 
{
    MONGO_TX_ERROR = 0,
    USER_NOT_FOUND = 1
}

export enum MongoOperations
{
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}


export class MongoDBTxError extends Error
{
    public errorOperation: MongoOperations;

    public constructor(operation: MongoOperations)
    {
        super(`There was issue with the operation: ${operation}`);
        this.errorOperation = operation;
    }
}

export class UserNotFoundError extends Error
{
    public userNotFound: UserIdentifier;
    
    public constructor(user: UserIdentifier)
    {
        super("The user was not found.");
        this.userNotFound = user;
    }
}

export class ItemNotFoundError extends Error
{
    public item: any;
    
    public constructor(item: any)
    {
        super("The item requested was not found.");
        this.item = item;
    }
}

