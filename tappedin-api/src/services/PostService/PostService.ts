import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";
import { WithUserID } from "../../common/commonTypes";
import { CommentInfo, PartialCommentInfo, PartialPostInfo, PostInfo } from "../../common/postDataTypes";
import { UserIdentifier } from "../../common/userDataTypes";
import TYPES from "../../types";
import { IDBAccessService } from "../DBAccessService/IDBAccessService";
import { IUserIdentificationService } from "../UserIdentificationService/IUserIdentificationService";
import { IPostService } from "./IPostService";

@injectable()
export class PostService implements IPostService
{
    private _dbAccessService: IDBAccessService;
    private _userIdentificationService: IUserIdentificationService;

    private readonly _postCollectionName: string = process.env.POST_COLLECTION_NAME ?? "testPostCol";
    private readonly _commentCollectionName: string = process.env.COMMENT_COLLECTION_NAME ?? "testCommentCol";
    private readonly _userCollectionName: string = process.env.USER_COLLECTION_NAME ?? "testCol";

    public constructor(@inject(TYPES.IDBAccessService) dbAccessService: IDBAccessService,
                       @inject(TYPES.IUserIdentificationService) userIdentificationService: IUserIdentificationService)
    {
        this._dbAccessService = dbAccessService;
        this._userIdentificationService = userIdentificationService;
    }

    /**
     * Add a post to the DB, attach the post to the userID from {userIdentifier}.
     * 
     * @param userIdentifier The userIdentifier to attach the post to
     * @param data The post data
     * 
     * @returns The objectID for the post document in the DB
     */
    public async addPost(userIdentifier: UserIdentifier, data: PostInfo): Promise<string> 
    {
        let userID: string;
        let toInsert: WithUserID;
        
        // Get the user ID
        userID = await this._userIdentificationService.getUserId(userIdentifier);

        // Attach the user ID to the data
        toInsert = { userID: ObjectId.createFromHexString(userID), ...data };

        return this._dbAccessService.createDocument(this._postCollectionName, toInsert);
    }

    /**
     * Update a post given the post's object ID and the data (need not be complete)
     * 
     * @param objectID The ID of the post to update
     * @param data The data to update the post with
     * 
     * @returns The object ID of the post updated
     */
    public async updatePost(objectID: string, data: PartialPostInfo): Promise<string> 
    {
        return this._dbAccessService.updateDocument(this._postCollectionName, objectID, data);
    }

    /**
     * Get a list of posts pertaining to the user from {userIdentifier}.
     * 
     * Note: Should return Array<PostInfo> but its hard to check and guarantee all 
     * elements of the array are of PostInfo.
     * 
     * @param userIdentifier The user to look for
     * 
     * @returns An array of posts from the user
     */
    public async getPosts(userIdentifier: UserIdentifier): Promise<Array<any>> 
    {
        let objectID: string;

        objectID = await this._userIdentificationService.getUserId(userIdentifier);

        return this._dbAccessService.getCollection(this._postCollectionName, 
            { userID: { $eq: ObjectId.createFromHexString(objectID) } });
    }

    /**
     * Get a post pertaining to the objectID
     * 
     * @param objectID The post ID to look for
     * 
     * @returns A singular post
     */
    public async getPostById(objectID: string): Promise<any> 
    {
        return this._dbAccessService.readDocument(this._postCollectionName, objectID);
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return ObjectID of the comment added.
     * 
     * @param userIdentifier 
     * 
     * @returns 
     */
    public async addComment(userIdentifier: UserIdentifier, data: CommentInfo): Promise<string> 
    {
        let userID: string;
        let toInsert: WithUserID;

        // Get the user ID
        userID = await this._userIdentificationService.getUserId(userIdentifier);

        // Attach the user ID to the data
        toInsert = { userID: ObjectId.createFromHexString(userID), ...data };

        return this._dbAccessService.createDocument(this._commentCollectionName, toInsert);
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return ObjectID of the comment added.
     * 
     * @param commentID The commentID to add
     * @param postID The post to add the comment to
     * 
     * @returns A flag indicating a successful or unsuccessful add
     */
    public async addCommentID(commentID: string, postID: string): Promise<boolean> 
    {
        let postData: any;

        postData = await this._dbAccessService.readDocument(this._postCollectionName, postID);

        //Append to current list
        postData.commentIDs.push(commentID);

        try 
        {
            this._dbAccessService.updateDocument(this._postCollectionName, postID, postData);
        }
        catch (err)
        {
            console.log(err);
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return ObjectID of the comment updated.
     * 
     * @param commentID 
     * 
     * @returns 
     */
    public async updateComment(commentID: string, data: PartialCommentInfo): Promise<string> 
    {
        return Promise.resolve("");
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return comment corresponding to commentID (ObjectID).
     * 
     * @param commentID 
     * 
     * @returns 
     */
    public async getComment(commentID: string): Promise<CommentInfo> 
    {
        
        let commentData: any;
        let content: string;
        let userID: string;
        let dataCreated: string;
        let timestamp: Date;
        let userData: any;
        let fullName: string;

        commentData = await this._dbAccessService.readDocument(this._commentCollectionName, commentID);
        content = commentData.content;
        userID = commentData.userID.toString();
        dataCreated = commentData.dateCreated;
        timestamp = commentData.timestamp;

        userData = await this._dbAccessService.readDocument(this._userCollectionName, userID);
        fullName = `${userData.firstName} ${userData.lastName}`;
        return Promise.resolve({ content: content, userID: userID , 
            dateCreated: dataCreated, timestamp: timestamp, fullName: fullName });
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return array of comments corresponding to the post
     * 
     * @param postID 
     * 
     * @returns 
     */
    public async getCommentsFromPost(postID: string): Promise<Array<CommentInfo>> 
    {

        let postData:any;
        let commentIDs: Array<string>;
        let commentsArray: Array<CommentInfo> = [];

        postData = await this._dbAccessService.readDocument(this._postCollectionName, postID);
        commentIDs = postData.commentIDs;
        
        for (var index in commentIDs)
        {
            commentsArray.push(await this.getComment(commentIDs[index]));
        }
        return Promise.resolve(commentsArray);
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return an array of comments corresponding to that user
     * 
     * @param userIdentifier 
     * 
     * @returns
     */
    public async getCommentsFromUser(userIdentifier: UserIdentifier): Promise<Array<CommentInfo>> 
    {
        return Promise.resolve(new Array());
    }

    /**
     * Add a userID to the likeIDs array of a post
     * 
     * @param userIdentifier The userID to add
     * @param postID The post to add the like to
     * 
     * @returns A flag indicating a successful or unsuccessful add
     */
    public async addLike(userIdentifier: string, postID: string): Promise<boolean> 
    {
        let postData: any;

        postData = await this._dbAccessService.readDocument(this._postCollectionName, postID);

        //Append to current list
        postData.likeIDs.push(userIdentifier);

        try 
        {
            this._dbAccessService.updateDocument(this._postCollectionName, postID, postData);
        }
        catch (err)
        {
            console.log(err);
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    }

    /**
     * Remove a userID from the likeIDs array of a post
     *
     * @param userIdentifier The userID to remove
     * @param postID The post to remove from
     * 
     * @returns A flag indicating a successful or unsuccessful removal
     */
    public async removeLike(userIdentifier: string, postID: string): Promise<boolean> 
    {
        let postData: any;

        postData = await this._dbAccessService.readDocument(this._postCollectionName, postID);

        //Remove userID from like list
        let userIdx = postData.likeIDs.indexOf(userIdentifier);
        if (userIdx === -1)
        {
            // userID not in like list
            return Promise.resolve(false);
        }
        postData.likeIDs.splice(userIdx, 1);

        try 
        {
            this._dbAccessService.updateDocument(this._postCollectionName, postID, postData);
        }
        catch (err)
        {
            console.log(err);
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    }
}