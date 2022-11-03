import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function AboutMe() 
{
    const [ aboutMeData, setAboutMeData ] = useState();

    useEffect(() => 
    {
        fetchAboutMe();
    }, []);

    async function fetchAboutMe(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=3&idtype=1&id=testUser",
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
                        <div className="mb-4">
                            <p>
                                {aboutMeData.aboutMeText}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}