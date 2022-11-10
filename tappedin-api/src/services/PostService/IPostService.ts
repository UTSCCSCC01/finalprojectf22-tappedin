import { CommentInfo, PartialCommentInfo, PartialPostInfo, PostInfo } from "../../common/postDataTypes";
import { UserIdentifier } from "../../common/userDataTypes";

export interface IPostService
{
    addPost(userIdentifier: UserIdentifier, data: PostInfo): Promise<string>;
    updatePost(objectID: string, data: PartialPostInfo): Promise<string>;
    getPosts(userIdentifier: UserIdentifier): Promise<Array<PostInfo>>;
    addComment(userIdentifier: UserIdentifier, postID: string, data: CommentInfo): Promise<string>;
    updateComment(commentID: string, data: PartialCommentInfo): Promise<string>;
    getComment(commentID: string): Promise<CommentInfo>;
    getCommentsFromUser(userIdentifier: UserIdentifier): Promise<Array<CommentInfo>>;
    getCommentsFromPost(postID: string): Promise<Array<CommentInfo>>;
    addLike(userIdentifier: UserIdentifier, postID: string): Promise<boolean>;
    removeLike(userIdentifier: UserIdentifier, postID: string): Promise<boolean>;

    /**
     * Uncomment this and implement this if it's needed. 
     * or just get likes from getPost(), up to you. 
     */
    // getLikesFromPost(postID: string): Promise<Array<string>>;

    /* Uncomment this and implement this if it's needed. */
    //getLikedPosts(userIdentifier: UserIdentifier): Promise<Array<PostInfo>>;

    /**
     * leave this for later...
     */
    // deletePost(objectID: string): Promise<boolean>
}