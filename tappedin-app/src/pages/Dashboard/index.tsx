import {
    customBackground,
    editContainer,
    customNavbar,
    workExperienceContainer,
    addWorkExperienceContainer
} from "./Dashboard.module.scss";


import CoverImage from "../../components/CoverImage";
import axios from "axios";
import { useEffect, useState } from "react";
import WorkExperience from "../../sections/Dashboard/WorkExperience";
import FeatherIcon from "feather-icons-react";
import AboutMe from "../../sections/Dashboard/AboutMe";

export default function DashboardPage() 
{
    const [ workExperiencesData, setWorkExperiencesData ] = useState();
    const [ aboutMeData, setAboutMeData ] = useState();

    useEffect(() => 
    {
        fetchWorkExperiences();
        fetchAboutMe();
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
    async function fetchAboutMe(): Promise<void>
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
                setAboutMeData(null);
            else
                setAboutMeData(t.data);
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
                    <div className={`${customNavbar} justify-center mb-10`}>
                        <h1 className="font-bold text-center">
                            Tapped
                            <span style={{ color: "#639FAB" }}>In.</span>
                        </h1>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">Edit</h1>
                        <div className={`${editContainer}`}>
                            {/* TODO: Insert Content Here */}
                            <AboutMe aboutMeData={aboutMeData}
                            ></AboutMe>
                            <WorkExperience workExperiencesData={workExperiencesData}
                            ></WorkExperience>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
