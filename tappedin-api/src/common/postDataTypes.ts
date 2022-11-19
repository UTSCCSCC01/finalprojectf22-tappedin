export interface PostInfo
{
    authID: string;
    imageURL: string;           // Image if it exists, URL for now
    commentIDs: Array<string>;  // Array of comment IDs
    likeIDs: Array<string>;     // Array of userIDs that like the post
    title: string;              // Title of the post
    content: string;            // Main content
    dateCreated: string;        // Post created date
    timestamp: Date;            // timestamp
}

export interface PartialPostInfo
{
    authID?: string;             // The 
    imageURL?: string;           // Image if it exists, URL for now
    commentIDs?: Array<string>;  // Array of comment IDs
    likeIDs?: Array<string>;     // Array of userIDs that like the post
    title?: string;              // Title of the post
    content?: string;            // Main content
    dateCreated?: string;        // Post created date
    timestamp?: Date;            // timestamp
}

export interface CommentInfo
{
    content: string;     // The main content
    dateCreated: string; // comment created date
    timestamp: Date;     // timestamp
}

export interface PartialCommentInfo
{
    content?: string;     // The main content
    dateCreated?: string; // comment created date
    timestamp?: Date;     // timestamp
}