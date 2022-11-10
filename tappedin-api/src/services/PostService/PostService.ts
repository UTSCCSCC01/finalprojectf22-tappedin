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
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return ObjectID of the comment added.
     * 
     * @param userIdentifier 
     * @param postID 
     * 
     * @returns 
     */
    public async addComment(userIdentifier: UserIdentifier, postID: string, data: CommentInfo): Promise<string> 
    {
        return Promise.resolve("");
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
        return Promise.resolve({ content: "", userID: "" , dateCreated: "", timestamp: new Date() });
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
        return Promise.resolve(new Array());
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
     * TODO: Implement this function as needed, write documentation here.
     * 
     * Return a flag indicating that the add was successful
     * (can just be void if you think the flag is not needed, just change the interface too)
     * 
     * @param userIdentifier 
     * @param postID 
     * 
     * @returns
     */
    public async addLike(userIdentifier: UserIdentifier, postID: string): Promise<boolean> 
    {
        return Promise.resolve(true);
    }

    /**
     * TODO: Implement this function as needed, write documentation here.
     *
     * Return a flag indicating the removal was successful
     * (can just be void if you think the flag is not needed, just change the interface too)
     * 
     * @param userIdentifier 
     * @param postID 
     * 
     * @returns
     */
    public async removeLike(userIdentifier: UserIdentifier, postID: string): Promise<boolean> 
    {
        return Promise.resolve(true);
    }
}