import {
    addLocationContainer
} from "./Location.module.scss";

import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import axios from "axios";

export default function Location({ locationData: locationData })
{
    const [ isLocationEdit, setIsLocationEdit ] = useState(false);
    const [ location, setLocation ] = useState("");


    function handleSubmit()
    {
        const data = JSON.stringify({
            "location": location
        });

        const config = {
            method: `${locationData ? "put": "post"}`,
            url: `${locationData ? `http://localhost:3001/userFieldServices?field=2&objectid=${locationData._id}` 
                : "http://localhost:3001/userFieldServices?field=2&idtype=1&id=testUser"}`,
            headers: { 
                "Content-Type": "application/json"
            },
            data : data
        };

        axios(config).then(() => window.location.reload());

        setIsLocationEdit(false);
    }


    return (
        <div className="mt-6">
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="map-pin"></FeatherIcon>
                    <h2 className="font-bold ml-2">
                                            Location
                    </h2>
                </div>
            </div>
            {
                !isLocationEdit && (!locationData || locationData.location == "") ? 
                    <div
                        className={`${addLocationContainer} 
                                flex items-center`}
                    >
                                    
                        <div className="cursor-pointer" onClick={() => setIsLocationEdit(true)}>
                            <FeatherIcon
                                icon="plus"
                                size="54"
                                strokeWidth="1"
                                color="#BBCDE5"
                            />
                        </div>
                    </div>
                    : isLocationEdit ?
                        <div>
                            <input type="text" className="mb-3" placeholder="123 Street St, ON Welland Canada" value={location}
                                onChange={(t) => setLocation(t.target.value)}/ >
                            <div className="grid grid-cols-3">
                                <button className="button" onClick={() => handleSubmit()}>Update</button>
                            </div>                 
                        </div>
                        :
                        <div>
                            <div className="flex justify-between items-center">
                                <h3>{locationData.location}</h3>
                                <div className="cursor-pointer" onClick={() => 
                                {
                                    setIsLocationEdit(true);
                                    setLocation(locationData.location);
                                }}>
                                    <FeatherIcon icon="edit" stroke="#639FAB"></FeatherIcon>
                                </div>
                            </div>
                        </div>         
            }                   
        </div>
    );
}