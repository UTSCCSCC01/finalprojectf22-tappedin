import axios from "axios";
import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";

interface LikeButtonProps {
    id: string;
    likeIDs: Array<String>;
}

export default function LikeButton ({ id, likeIDs }: LikeButtonProps) 
{
    
    const [ liked, setLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState(0);
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
    const userId = typeof localStorage !== "undefined"
        ? localStorage.getItem("userID")
        : null;

    useEffect(() => 
    {
        setLiked(likeIDs.includes(userId));
        setNumLikes(likeIDs.length);
    }, []);

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

        try
        {
            await axios(config);

            if (updateMethod === "add")
                setNumLikes(numLikes + 1);
            else
                setNumLikes(numLikes - 1);
        }
        catch (e)
        {
            console.error(e);
        }
    };

    return (
        <div className="flex">
            <button onClick={() => handleLike()}>
                <FeatherIcon icon="heart" fill={liked ? "#db1a24" : "none"} stroke={liked ? "#db1a24" : "black"} strokeWidth="0.5"></FeatherIcon>
            </button>
            <p className="ml-2 mt-1">{ numLikes }</p>
        </div>
        
    );
}