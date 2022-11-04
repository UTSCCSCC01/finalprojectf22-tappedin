import axios from "axios";
import { useEffect, useState } from "react";
import { customBanner,
    isLarge } from "./CoverImage.module.scss";

interface CoverImageProps {
    size?: string;
    publicProfile: boolean;
    existingImage?: any;
}

export default function CoverImage({ size = "sm", publicProfile, existingImage=null }: CoverImageProps)
{
    const [ coverImageData, setCoverImageData ] = useState();

    useEffect(() => 
    {
        
        if(existingImage)
        {
            setCoverImageData(existingImage);
        }
        else
        {  
            let userID: string | null;
            const currentURL: string | null = (typeof window !== "undefined") ? window.location.href : "";
            if (currentURL.includes("PublicProfile"))
            {
                userID = new URLSearchParams(
                    window.location.search
                ).get("id");
            }
            else
            {
                userID = (typeof localStorage !== "undefined") ? localStorage.getItem("userID") : null;
            }
            fetchCoverImage(userID);
        }
    }, []);

    async function fetchCoverImage(userID: string): Promise<void> 
    {
        
        
        if (!userID)
            return;

        const config = {
            method: "get",
            url: process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=6&idtype=3&id="+userID,
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404)
                setCoverImageData(null);
            else setCoverImageData(t.data[0]);

        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div>
            <div
                className={`${customBanner} mb-10 ${size == "lg" ? isLarge : "" } relative`}
                style={
                    coverImageData && coverImageData.imageUrl != ""
                        ? { backgroundImage: `url(${coverImageData.imageUrl})` }
                        : {
                            background:
                                  "linear-gradient(271.61deg, #639FAB -16.87%, rgba(99, 159, 171, 0.34) 109.57%)",
                        }
                }
            >
                {publicProfile ? 
                    <h1 className="absolute bottom-[10%] right-[5%] font-bold text-white text-2xl md:text-6xl">
                        Tapped
                        <span className="is-lightblue">
                            In.
                        </span>
                    </h1>
                    :
                    ""
                }
                
            </div>
        </div>
    );
}
