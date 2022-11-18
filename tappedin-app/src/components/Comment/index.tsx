import { commentContainer, commentContent, profileContainer } from "./Comment.module.scss";

export default function Comment({ comment }) 
{
    console.log(comment);

    return (
        <div className={`${commentContainer}`}>
            <div className={`${commentContent}`}>
                <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                        <div className={`${profileContainer} mr-4 flex items-center justify-center`}>
                            <h3 className="font-bold">{comment.fullName[0].toUpperCase()}</h3>
                        </div>
                        <h3 className="font-bold">{comment.fullName}</h3>
                    </div>
                    <div>
                        <p className="pre-wrap mb-3">{comment.content}</p>
                        <p className="text-xs">{comment.dateCreated}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}