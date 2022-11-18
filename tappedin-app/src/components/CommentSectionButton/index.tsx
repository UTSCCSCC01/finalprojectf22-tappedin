import FeatherIcon from "feather-icons-react";

export default function CommentSectionButton ({ id, numComments }) 
{
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
    {
        e.preventDefault();
        localStorage.setItem("postID", id);
        window.open("/CommentSection", "_self");
    };
    
    return (
        <div className="cursor-pointer w-fit flex">
            <FeatherIcon
                icon="message-circle"
                stroke="#639FAB"
                onClick={(e) => handleSubmit(e)}
            ></FeatherIcon>
            <p className="ml-2 mr-2 text-base">{ numComments }</p>
        </div>
    );
}