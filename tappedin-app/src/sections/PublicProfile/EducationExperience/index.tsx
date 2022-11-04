import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function EducationExperience() 
{
    const [ educationExperiencesData, setEducationExperiencesData ] = useState();

    useEffect(() => 
    {
        fetchEducationExperiences();
    }, []);

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
