import { profileImageContainer, lineBreak } from "./PublicProfile.module.scss";

import CoverImage from "../../components/CoverImage";
import Location from "../../sections/PublicProfile/Location";
import AboutMe from "../../sections/PublicProfile/AboutMe";
import WorkExperience from "../../sections/PublicProfile/WorkExperience";
import EducationExperience from "../../sections/PublicProfile/EducationExperience";
import ContactInfo from "../../sections/PublicProfile/ContactInfo";
import Interests from "../../sections/PublicProfile/Interests";
import Socials from "../../sections/PublicProfile/Socials";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicProfile() 
{
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?";
    
    const [ fullName, setFullName ] = useState("");

    useEffect(() => 
    {
        const userID: string = new URLSearchParams(
            window.location.search
        ).get("id");

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

    return (
        <div>
            <CoverImage size="lg"></CoverImage>
            <div className="container mx-auto px-5 md:px-0">
                <div className="grid grid-cols-5 mb-8">
                    <div className="col-span-2">
                        <div className={`${profileImageContainer}`}></div>
                    </div>
                    <div className="col-span-1 md:col-span-2"></div>
                    <button className="button col-span-2 md:col-span-1">
                        Connect
                    </button>
                </div>

                <div className="grid grid-cols-3 mb-12">
                    <div className="col-span-3 md:col-span-2">
                        <h1 className="title">{fullName}</h1>
                        <h3>
                            “Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Aliquet risus feugiat in ante.”
                        </h3>
                    </div>
                </div>

                <div className="mb-12">
                    {/* TODO: Insert Social Content Here */}
                    <Socials></Socials>
                </div>

                <div className={`${lineBreak} mb-12`}></div>

                <div>
                    <h1 className="font-bold text-4xl mb-8">Info</h1>
                    {/* TODO: Insert Other Content Here */}
                    <AboutMe></AboutMe>
                    <ContactInfo></ContactInfo>
                    <WorkExperience></WorkExperience>
                    <EducationExperience></EducationExperience>
                    <Location></Location>
                    <Interests></Interests>
                    <div className="py-3"></div>
                </div>
            </div>
        </div>
    );
}
