import { 
    addEducationExperienceContainer 
} from "./EducationExperience.module.scss";

import FeatherIcon from "feather-icons-react";
import EducationExperienceCard from "../../../components/EducationExperienceCard";

export default function EducationExperience( { educationExperiencesData: educationExperiencesData } )
{
    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="book-open"></FeatherIcon>
                    <h2 className="font-bold ml-2">Education Experience</h2>
                </div>
                
            </div>
            { 
                educationExperiencesData &&
                    educationExperiencesData.map((educationExperienceData, key) => 
                    {
                        return <EducationExperienceCard educationExperienceData={educationExperienceData} 
                            key={key}></EducationExperienceCard>;
                    })
            }
            <div
                className={`${addEducationExperienceContainer} 
                                flex items-center justify-center`}
            >
                <a href="/EditEducationExperience">
                    <div className="cursor-pointer">
                        <FeatherIcon
                            icon="plus"
                            size="54"
                            strokeWidth="1"
                            color="#BBCDE5"
                        />
                    </div>
                </a>
            </div>
        </div>
    );
}