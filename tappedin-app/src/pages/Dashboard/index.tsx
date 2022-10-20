import {
    customBackground,
    editContainer,
    customNavbar,
    workExperienceContainer,
    addWorkExperienceContainer
} from "./Dashboard.module.scss";

import FeatherIcon from "feather-icons-react";
import CoverImage from "../../components/CoverImage";
import WorkExperienceCard from "../../components/WorkExperienceCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() 
{
    const [ workExperienceData, setWorkExperienceData ] = useState();

    var config = {
        method: "get",
        url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
        headers: { }
    };

    useEffect(() => 
    {
        axios(config)
            .then(function (response) 
            {
                setWorkExperienceData(response.data);
                console.log(
                    "HELLO"
                );
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    });

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
                            <div>
                                <div className="mb-3">
                                    <label>Work</label>
                                </div>
                                { workExperienceData && 
                                workExperienceData.map((workExperience, index) => 
                                {
                                    return <WorkExperienceCard data={workExperience}></WorkExperienceCard>;
                                })}
                                <div
                                    className={`${addWorkExperienceContainer} 
                                flex items-center justify-center`}
                                >
                                    <a href="/CreateWorkExperience">
                                        <div className="cursor-pointer">
                                            <FeatherIcon
                                                icon="plus"
                                                size="54"
                                                stroke-width="1"
                                                color="#BBCDE5"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
