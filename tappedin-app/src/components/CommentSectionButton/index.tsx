import axios from "axios";
import { useState } from "react";
import FeatherIcon from "feather-icons-react";

export default function CommentSectionButton ({ id }) 
{

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
    {
        e.preventDefault();
        localStorage.setItem("postID", id);
        window.open("/CommentSection", "_self");
    };
    
    return (
        <div className="cursor-pointer w-fit">
            <FeatherIcon
                icon="message-circle"
                stroke="#639FAB"
                onClick={(e) => handleSubmit(e)}
            ></FeatherIcon>
        </div>
        
    );
}