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
        <div className="w-fit flex">
            <div className="cursor-pointer">
                <FeatherIcon
                    icon="message-circle"
                    stroke="#639FAB"
                    onClick={(e) => handleSubmit(e)}
                ></FeatherIcon>
            </div>
            
            <p className="ml-2 mr-4 text-base">{ numComments }</p>
        </div>
    );
}