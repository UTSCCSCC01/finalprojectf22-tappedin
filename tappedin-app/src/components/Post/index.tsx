import { postContainer, postImage, postContent } from "./Post.module.scss";

export default function Post({ post }) 
{
    return (
        <div className={`${postContainer}`}>
            <div
                className={`${postImage}`}
                style={
                    post.imageURL
                        ? {
                            backgroundImage: `url(${post.imageURL})`,
                        }
                        : {
                            background:
                                  "linear-gradient(179.81deg, #BBCDE5 0.16%, rgba(187, 205, 229, 0) 94.83%)",
                        }
                }
            ></div>
            <div className={`${postContent}`}>
                <p className='text-sm'>{post.likeIDs.length} Likes</p>
                <h3 className="is-text-gradient-1 font-bold">{post.title}</h3>
                <p className="text-sm mb-4 font-semibold">{post.name}</p>
                <p className="pre-wrap mb-4">{post.content}</p>
                <div className="">
                    <p className="text-sm">{post.dateCreated}</p>
                </div>
            </div>
        </div>
    );
}
