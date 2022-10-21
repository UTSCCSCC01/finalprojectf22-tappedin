import { 
    addWorkExperienceContainer 
} from "./WorkExperience.module.scss";

import FeatherIcon from "feather-icons-react";
import WorkExperienceCard from "../../../components/WorkExperienceCard";

export default function WorkExperience( { workExperiencesData: workExperiencesData } )
{
    return (
        <div>
            <div className="mb-3">
                <label>Work</label>
            </div>
            { 
                workExperiencesData &&
                    workExperiencesData.map((workExperienceData, key) => 
                    {
                        return <WorkExperienceCard workExperienceData={workExperienceData} 
                            key={key}></WorkExperienceCard>;
                    })
            }
            <div
                className={`${addWorkExperienceContainer} 
                                flex items-center justify-center`}
            >
                <a href="/CreateWorkExperience">
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