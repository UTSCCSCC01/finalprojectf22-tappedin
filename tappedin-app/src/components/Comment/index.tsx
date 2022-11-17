import { commentContainer, commentContent } from "./Comment.module.scss";

export default function Comment({ comment }) 
{
    return (
        <div className={`${commentContainer}`}>
            <div className={`${commentContent}`}>
                <p className="text-3xl">{comment.username}</p>
                <p className="pre-wrap mb-4">{comment.content}</p>
                <div className="">
                    <p className="text-sm">{comment.dateCreated}</p>
                </div>
            </div>
        </div>
    );
}