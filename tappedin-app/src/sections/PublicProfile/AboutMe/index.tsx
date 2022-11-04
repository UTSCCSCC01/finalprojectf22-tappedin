import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function AboutMe() 
{
    const [ aboutMeData, setAboutMeData ] = useState();

    useEffect(() => 
    {
        const userID = new URLSearchParams(
            window.location.search
        ).get("id");

        fetchAboutMe(userID);
    }, []);

    async function fetchAboutMe(userID: string): Promise<void> 
    {
        if (!userID)
            return;
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=3&idtype=3&id=" + userID;
        const config = {
            method: "get",
            url: url,
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setAboutMeData(null);
            else setAboutMeData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center mb-6">
                <FeatherIcon icon="user"></FeatherIcon>
                <h2 className="font-bold ml-2">About Me</h2>
            </div>
            {aboutMeData &&
                aboutMeData.map((aboutMeData, key) => 
                {
                    return (
                        <div className="mb-4 pre-wrap" key={key}>
                            <p>
                                {aboutMeData.aboutMeText}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}