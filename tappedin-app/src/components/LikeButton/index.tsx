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
        let updateMethod: string = liked ? "remove" : "add";
        setLiked(!liked);

        // Update post info with new likeIDs

        const data = {
            userID: userId,
            updateMethod: updateMethod
        };

        const config = {
            method: "put",
            url: `${baseURL}/postService/updateLike?objectid=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response){
                console.log(response.data);
            })
            .catch(function (e) {
                console.log(e);
            })

    };

    return (
        <button onClick={() => handleLike()}>
            <FeatherIcon icon="heart" fill={liked ? "#db1a24" : "none"} strokeWidth="none"></FeatherIcon>
        </button>
    );
}