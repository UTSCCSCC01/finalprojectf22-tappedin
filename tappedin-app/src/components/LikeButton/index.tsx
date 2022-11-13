import axios from "axios";
import { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import { likeContainer } from './LikeButton.module.scss';

interface LikeButtonProps {
    id: string;
    likeIDs: Array<String>;
}

export default function LikeButton ({ id, likeIDs }: LikeButtonProps) {
    
    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
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
        setNumLikes(liked ? numLikes-1 : numLikes+1)
        setLiked(!liked);
    };

    return (
        <div>
            <button onClick={() => handleLike()}>
                <FeatherIcon icon="heart" fill={liked ? "#db1a24" : "none"} strokeWidth="none"></FeatherIcon>
            </button>
            <p className={`${likeContainer}`}>{numLikes} {numLikes === 1 ? "Like" : "Likes"}</p>
        </div>
    );
}