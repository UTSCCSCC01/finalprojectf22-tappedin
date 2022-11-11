import { postContainer, postImage, postContent } from "./Post.module.scss";
import axios from "axios";
import { useState } from "react";
// import HeartIcon from 'feather-icons-react';

export default function Post({ post })
{

    const userId =
        typeof localStorage !== "undefined"
            ? localStorage.getItem("userID")
            : null;
    const [liked, setLiked] = useState(post.likeIDs.includes(userId));
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

    async function handleLike() 
    {
        if (!liked) 
        {
            console.log("Added like");
            post.likeIDs.push(userId);
            setLiked(true);
        } 
        else 
        {
            console.log("Removed like");
            post.likeIDs.splice(post.likeIDs.indexOf(userId), 1);
            setLiked(false);
        }
        // Update post info with new likeIDs

        const data = {
            likeIDs: post.likeIDs
        };

        // Hit updatePost route for now
        const config = {
            method: "put",
            url: `${baseURL}/postService/updatePost?objectid=${post._id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        console.log(config);

        axios(config)
            .then(function (response){
                console.log(response.data);
            })
            .catch(function (e) {
                console.log(e);
            })

    };

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
                <button onClick={() => handleLike()}>{liked ? "Unlike" : "Like"}</button>
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
