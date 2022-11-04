import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function Location() 
{
    const [ locationData, setLocationData ] = useState();

    useEffect(() => 
    {
        fetchLocation();
    }, []);

    async function fetchLocation(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=2&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
            setLocationData(null);
            else setLocationData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center mb-6">
                <FeatherIcon icon="map-pin"></FeatherIcon>
                <h2 className="font-bold ml-2">Location</h2>
            </div>
            {locationData &&
                locationData.map((locationData, key) => 
                {
                    return (
                        <div className="mb-4">
                            <p>
                                {locationData.location}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}