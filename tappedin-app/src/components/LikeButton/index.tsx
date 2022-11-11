import axios from "axios";
import { useState } from "react";
import FeatherIcon from 'feather-icons-react';

export default function LikeButton ({ id, likeIDs }) {
    const userId =
        typeof localStorage !== "undefined"
            ? localStorage.getItem("userID")
            : null;
    const [liked, setLiked] = useState(likeIDs.includes(userId));
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

    async function handleLike() 
    {
        if (!liked) 
        {
            console.log("Added like");
            likeIDs.push(userId);
            setLiked(true);
        } 
        else 
        {
            console.log("Removed like");
            likeIDs.splice(likeIDs.indexOf(userId), 1);
            setLiked(false);
        }
        // Update post info with new likeIDs

        const data = {
            likeIDs: likeIDs
        };

        // Hit updatePost route for now
        const config = {
            method: "put",
            url: `${baseURL}/postService/updatePost?objectid=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        console.log(config);

        // axios(config)
        //     .then(function (response){
        //         console.log(response.data);
        //     })
        //     .catch(function (e) {
        //         console.log(e);
        //     })

    };

    return (
        <button onClick={() => handleLike()}>
            <FeatherIcon icon="heart" fill={liked ? "#db1a24" : "none"} stroke-width="none"></FeatherIcon>
        </button>
    );
}