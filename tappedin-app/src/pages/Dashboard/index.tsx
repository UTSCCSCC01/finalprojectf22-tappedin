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
import { FirebaseAuthenticationService } from "../../sdk/services/firebaseAuthenticationService";

const authService = new FirebaseAuthenticationService();
export default function DashboardPage() 
{
    const [ workExperiencesData, setWorkExperiencesData ] = useState();
    const [ socialData, setSocialData ] = useState();
    const [ aboutMeData, setAboutMeData ] = useState();
    const [ interestsData, setInterestsData ] = useState();
    const [ educationExperiencesData, setEducationExperiencesData ] = useState();
    const [ locationData, setLocationData ] = useState();
    const [ contactInfoData, setContactInfoData ] = useState();
    const [ fullName, setFullName ] = useState("");
    const [ userID, setUserID ] = useState("");

    
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?";

    useEffect(() => 
    {
        const userID = localStorage.getItem("userID");
        setUserID(userID);
        fetchWorkExperiences(userID);
        fetchInterests(userID);
        fetchAboutMe(userID);
        fetchSocials(userID);
        fetchEducationExperiences(userID);
        fetchLocationData(userID);
        fetchContactInfo(userID);
        fetchFullName(userID);
    }, []);

    async function fetchFullName(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=7&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404)
                setFullName("");
            else
            {
                setFullName(`${t.data[0].firstName} ${t.data[0].lastName}`);
            } 
            
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchWorkExperiences(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=1&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404)
                setWorkExperiencesData(null);
            else setWorkExperiencesData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchLocationData(userID: string) 
    {
        const config = {
            method: "get",
            url: baseURL + "field=2&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404)
                setLocationData(null);
            else setLocationData(t.data[0]); // Since we can only have 1 location
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchEducationExperiences(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=0&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404)
                setEducationExperiencesData(null);
            else setEducationExperiencesData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }
    
    async function fetchAboutMe(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=3&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 404 || t.status == 400)
                setAboutMeData(null);
            else setAboutMeData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchInterests(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=5&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 404 || t.status == 400)
                setInterestsData(null);
            else setInterestsData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchContactInfo(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=8&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 404 || t.status == 400)
                setContactInfoData(null);
            else setContactInfoData(t.data[0]); // only one entry per user
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchSocials(userID: string): Promise<void> 
    {
        const config = {
            method: "get",
            url: baseURL + "field=4&idtype=3&id=" + userID,
            headers: {},
            validateStatus: (status) => { return status < 500; }
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 404 || t.status == 400)
                setSocialData(null);
            else setSocialData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function signOut() 
    {
        authService.signOut();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userID");
        window.open("/", "_self");
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
                        <h2 className="text-center font-bold">{fullName}</h2>

                        <div className="mt-16 w-full">
                            <button className="button is-blue is-dashed">
                                Feed
                            </button>
                            <button className="button is-blue mt-3">
                                Edit
                            </button>
                        </div>

                        <div className="mt-16 w-full">
                            
                            <div className="flex items-center cursor-pointer" onClick={() => signOut()}>
                                <FeatherIcon
                                    icon="log-out"
                                    stroke="#BBCDE5"
                                ></FeatherIcon>
                                <label className="ml-3 cursor-pointer">
                                        Sign Out
                                </label>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">Edit</h1>
                        <div className={`${editContainer} mb-12`}>
                            <a href={`/PublicProfile?id=${userID}`}>
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