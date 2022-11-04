import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function EducationExperience() 
{
    const [ educationExperiencesData, setEducationExperiencesData ] = useState();

    useEffect(() => 
    {
        const userID: string = new URLSearchParams(
            window.location.search
        ).get("id");

        fetchEducationExperiences(userID);
    }, []);

    async function fetchEducationExperiences(userID: string): Promise<void> 
    {
        if (!userID)
            return;
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=0&idtype=3&id=" + userID;
        const config = {
            method: "get",
            url: url,
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

    return (
        <div className="mb-10">
            <div className="flex items-center mb-6">
                <FeatherIcon icon="book-open"></FeatherIcon>
                <h2 className="font-bold ml-2">Education Experience</h2>
            </div>
            {educationExperiencesData &&
                educationExperiencesData.map((educationExperienceData, key) => 
                {
                    return (
                        <div className="mb-6">
                            <div className="mb-4">
                                <p className="font-bold">
                                    {educationExperienceData.programOfStudy} @
                                    <span className="is-text-gradient-1">
                                        {` ${educationExperienceData.schoolName}`}
                                    </span>
                                </p>
                                <p>
                                    {educationExperienceData.schoolAddress},{" "}
                                    {educationExperienceData.schoolState}{" "}
                                    {educationExperienceData.schoolCity}{" "}
                                    {educationExperienceData.schoolCountry}{" "}
                                </p>
                                <p>
                                    {educationExperienceData.dateStarted} -{" "}
                                    {educationExperienceData.dateEnded}
                                </p>
                            </div>
                            <p>{educationExperienceData.description}</p>
                        </div>
                    );
                })}
        </div>
    );
}
