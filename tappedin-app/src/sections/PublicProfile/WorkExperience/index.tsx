import axios from "axios";
import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";

export default function WorkExperience() 
{
    const [ workExperiencesData, setWorkExperiencesData ] = useState();

    useEffect(() => 
    {
        const userID: string = new URLSearchParams(
            window.location.search
        ).get("id");

        fetchWorkExperiences(userID);
    }, []);

    async function fetchWorkExperiences(userID: string): Promise<void> 
    {
        if (!userID)
            return;
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=1&idtype=3&id=" + userID;
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
                setWorkExperiencesData(null);
            else setWorkExperiencesData(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center mb-6">
                <FeatherIcon icon="briefcase"></FeatherIcon>
                <h2 className="font-bold ml-2">Work Experience</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workExperiencesData &&
                    workExperiencesData.map((workExperienceData, key) => 
                    {
                        return (
                            <div key={key}>
                                <div className="mb-4">
                                    <p className="font-bold">
                                        {workExperienceData.workPositionName} @
                                        <span className="is-text-gradient-1">
                                            {` ${workExperienceData.workName}`}
                                        </span>
                                    </p>
                                    <p>
                                        {workExperienceData.workAddress},{" "}
                                        {workExperienceData.workState}{" "}
                                        {workExperienceData.workCity}{" "}
                                        {workExperienceData.workCountry}
                                    </p>
                                    <p>{`${workExperienceData.dateStarted} - ${workExperienceData.dateEnded}`}</p>
                                </div>

                                <p className="pre-wrap">
                                    {workExperienceData.description}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
