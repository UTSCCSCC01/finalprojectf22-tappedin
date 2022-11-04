import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function Interests() 
{
    const [ interestsData, setInterestsData ] = useState<any>();

    useEffect(() => 
    {
        fetchInterestsData();
    }, []);

    async function fetchInterestsData(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=5&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);
            
            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setInterestsData(null);
            else setInterestsData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center mb-6">
                <FeatherIcon icon="dribbble"></FeatherIcon>
                <h2 className="font-bold ml-2">Interests</h2>
            </div>
            {interestsData &&
                interestsData.map((interestsData, key) => 
                {
                    return (
                        <div className="mb-6">
                            <div className="mb-4">
                                <p className="font-bold">
                                    {interestsData.interestName}
                                </p>
                            </div>
                            <p>{interestsData.description}</p>
                        </div>
                    );
                })}
        </div>
    );
}
