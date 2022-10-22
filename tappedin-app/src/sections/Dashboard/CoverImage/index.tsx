import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { 
    addCoverImageContainer 
} from "./CoverImage.module.scss";
import axios from "axios";

export default function CoverImageSection()
{
    const [ isEdit, setIsEdit ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState("");

    async function handleSubmit()
    {
        const data = JSON.stringify({
            "imageUrl": imageUrl
        });
          
        const config = {
            method: "put",
            url: "http://localhost:3001/userFieldServices?field=6&objectid=635355b103752563a1fb404c",
            headers: { 
                "Content-Type": "application/json"
            },
            data : data
        };
        
        try
        {
            await axios(config);

            window.location.reload();
        }
        catch (e)
        {
            console.error(e);
        }
        
    }

    return (
        <div className="mb-8">
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="image"></FeatherIcon>
                    <h2 className="font-bold ml-2">Location</h2>
                </div>
            </div>

            <div
                className={`${addCoverImageContainer} 
                                flex items-center justify-center mb-3`}
            >
                
                <div className="cursor-pointer" onClick={() => setIsEdit(!isEdit)}>
                    <FeatherIcon
                        icon="image"
                        size="54"
                        strokeWidth="1"
                        color="#BBCDE5"
                    />
                </div>

            </div>
            { isEdit &&
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                    <input type="text" className="input" placeholder="http://www.image.com" value={imageUrl} onChange={(t) => setImageUrl(t.target.value)}/>
                </div>
                <button className="button" onClick={() => handleSubmit()}>
                    Update
                </button>
            </div>
            }
            
            
        </div>
    );
}