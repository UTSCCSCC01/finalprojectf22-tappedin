import {
    customBackground,
    editContainer,
    customNavbar,
    profileImageContainer,
    viewDashboardContainer
} from "./Dashboard.module.scss";

import CoverImage from "../../components/CoverImage";
import axios from "axios";
import { useEffect, useState } from "react";
import WorkExperience from "../../sections/Dashboard/WorkExperience";
import Interests from "../../sections/Dashboard/Interests";
import ContactInfo from "../../sections/Dashboard/ContactInfo";
import Location from "../../sections/Dashboard/Location";
import FeatherIcon from "feather-icons-react";
import Social from "../../sections/Dashboard/Social";
import AboutMe from "../../sections/Dashboard/AboutMe";
import EducationExperience from "../../sections/Dashboard/EducationExperience";
import CoverImageSection from "../../sections/Dashboard/CoverImage";
export default function DashboardPage() 
{
    const [ workExperiencesData, setWorkExperiencesData ] = useState();
    const [ socialData, setSocialData ] = useState();
    const [ aboutMeData, setAboutMeData ] = useState();
    const [ interestsData, setInterestsData ] = useState();
    const [ educationExperiencesData, setEducationExperiencesData ] = useState();
    const [ locationData, setLocationData ] = useState();
    const [ contactInfoData, setContactInfoData ] = useState();

    useEffect(() => 
    {
        fetchWorkExperiences();
        fetchInterests();
        fetchAboutMe();
        fetchSocials();
        fetchEducationExperiences();
        fetchLocationData();
        fetchContactInfo();
    }, []);

    async function fetchWorkExperiences(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setWorkExperiencesData(null);
            else setWorkExperiencesData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchLocationData() 
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
            else setLocationData(t.data[0]); // Since we can only have 1 location
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchEducationExperiences(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=0&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setEducationExperiencesData(null);
            else setEducationExperiencesData(t.data);
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

    async function fetchInterests(): Promise<void> 
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

    async function fetchContactInfo(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=7&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setContactInfoData(null);
            else setContactInfoData(t.data[0]); // only one contact info entry per user
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
            url: "http://localhost:3001/userFieldServices?field=4&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setSocialData(null);
            else setSocialData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className={`${customBackground}`}>
            <CoverImage
            ></CoverImage>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-4">
                    <div
                        className={`${customNavbar} flex flex-col items-center justify-center mb-10`}
                    >
                        <h1 className="font-bold text-center mb-6">
                            Tapped
                            <span style={{ color: "#639FAB" }}>In.</span>
                        </h1>
                        <div className={`${profileImageContainer} mb-10`}></div>
                        <p>Welcome back</p>
                        <h2 className="text-center font-bold">Ben Saobuppha</h2>

                        <div className="mt-16 w-full">
                            <button className="button is-blue is-dashed">
                                Feed
                            </button>
                            <button className="button is-blue mt-3">
                                Edit
                            </button>
                        </div>

                        <div className="mt-16 w-full">
                            <a href="/">
                                <div className="flex items-center cursor-pointer">
                                    <FeatherIcon
                                        icon="log-out"
                                        stroke="#BBCDE5"
                                    ></FeatherIcon>
                                    <label className="ml-3 cursor-pointer">
                                        Sign Out
                                    </label>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">Edit</h1>
                        <div className={`${editContainer} mb-12`}>
                            <a href="/PublicProfile">
                                <div className="flex justify-end">
                                    <div className={`flex justify-center items-center ${viewDashboardContainer} cursor-pointer`}>
                                        <FeatherIcon
                                            icon="eye"
                                            stroke="#639FAB"
                                            width="30"
                                            height="30"
                                            strokeWidth="1.5"
                                        ></FeatherIcon>
                                    </div>
                                </div>
                            </a>
                            
                            <CoverImageSection></CoverImageSection>
                            <AboutMe aboutMeData={aboutMeData}></AboutMe>
                            <ContactInfo contactInfoData={contactInfoData}></ContactInfo>
                            <Social socialData={socialData}></Social>
                            <WorkExperience workExperiencesData={workExperiencesData}></WorkExperience>
                            <EducationExperience educationExperiencesData={educationExperiencesData}></EducationExperience>
                            <Location locationData={locationData}></Location>
                            <Interests interestsData={interestsData}></Interests>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
