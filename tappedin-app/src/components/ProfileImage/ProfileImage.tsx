import axios from "axios";
import { useEffect, useState } from "react";
import {
    profileImageContainer,
    lg,
    sm
} from "./ProfileImage.module.scss";

interface ProfileImageProps {
    size?: string;
    userId: string
}

export default function ProfileImage({ size, userId }: ProfileImageProps)
{
    const [ profileImageUrl, setProfileImageUrl ] = useState();

    useEffect(() => 
    {
        fetchProfileImage();
    }, []); 

    async function fetchProfileImage(): Promise<void>
    {
        const config = {
            method: "get",
            url:
                process.env.NEXT_PUBLIC_SERVER_ADDRESS +
                "/userFieldServices?field=9&idtype=3&id=" +
                userId,
            headers: {},
            validateStatus: (status) => 
            {
                return status < 500;
            },
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404) setProfileImageUrl(null);
            else setProfileImageUrl(t.data[0].imageUrl);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return(
        <div>
            <div className={`${profileImageContainer} ${size == "lg" && lg} ${size == "sm" && sm}`} style={{ backgroundImage: `url(${profileImageUrl})` }}></div>
        </div>
    );
}
