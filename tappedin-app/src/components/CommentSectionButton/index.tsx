import axios from "axios";
import { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';

interface CommentButtonProps {
    id: string;
    commentIDs: Array<String>;
}
export default function CommentSectionButton ({ id, commentIDs }): CommentButtonProps {
    const [ numComments, setNumComments ] = useState(0);


    useEffect(() => 
    {
        setNumComments(commentIDs.length);
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
    {
        e.preventDefault();
        localStorage.setItem("postID", id);
        window.open("/CommentSection", "_self");
    };

    
    
    return (
        <div className="flex">
            <FeatherIcon
                icon="message-circle"
                stroke="#639FAB"
                onClick={(e) => handleSubmit(e)}
            ></FeatherIcon>
            <p className="ml-2 mt-1">{ numComments }</p>
        </div>
    );
}