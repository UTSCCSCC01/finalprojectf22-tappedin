import {
    customBackground,
    editContainer,
    customNavbar,
    profileImageContainer
} from "./Dashboard.module.scss";

import CoverImage from "../../components/CoverImage";
import axios from "axios";
import { useEffect, useState } from "react";
import WorkExperience from "../../sections/Dashboard/WorkExperience";
import FeatherIcon from "feather-icons-react";
import Social from "../../sections/Dashboard/Social";

export default function DashboardPage() 
{
    const [ workExperiencesData, setWorkExperiencesData ] = useState();
    const [socialData, setSocialData] = useState();
    useEffect(() => 
    {
        fetchWorkExperiences();
        fetchSocials();
    }, []);

    async function fetchWorkExperiences(): Promise<void>
    {

        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
            headers: { }
        };
    
        try
        {
            const t = await axios(config);
            
            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setWorkExperiencesData(null);
            else
                setWorkExperiencesData(t.data);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    async function fetchSocials(): Promise<void>
    {

        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=2&idtype=1&id=testUser",
            headers: { }
        };
    
        try
        {
            const t = await axios(config);
            
            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setSocialData(null);
            else
                setSocialData(t.data);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    return (
        <div className={`${customBackground}`}>
            <CoverImage></CoverImage>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-4">
                    <div className={`${customNavbar} flex flex-col items-center justify-center mb-10`}>
                        <h1 className="font-bold text-center mb-6">
                            Tapped
                            <span style={{ color: "#639FAB" }}>In.</span>
                        </h1>
                        <div className={`${profileImageContainer} mb-10`}></div>
                        <p>Welcome back</p>
                        <h2 className="text-center font-bold">Ben Saobuppha</h2>

                        <div className="mt-16 w-full">
                            <button className="button is-blue is-dashed">Feed</button>
                            <button className="button is-blue mt-3">Edit</button>
                        </div>

                        <div className="mt-16 w-full">
                            <a href="/">
                                <div className="flex items-center cursor-pointer">
                                    <FeatherIcon icon="log-out" stroke="#BBCDE5"></FeatherIcon>
                                    <label className="ml-3 cursor-pointer">Sign Out</label>
                                </div>
                            </a>
                            
                        </div>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">Edit</h1>
                        <div className={`${editContainer}`}>
                            {/* TODO: Insert Content Here */}
                            <Social socialData={socialData}
                            ></Social>
                            
                        </div>
                        <div className={`${editContainer}`}>
                            {/* TODO: Insert Content Here */}
                            <WorkExperience workExperiencesData={workExperiencesData}
                            ></WorkExperience>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
