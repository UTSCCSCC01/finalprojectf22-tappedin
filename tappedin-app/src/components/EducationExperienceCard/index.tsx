
import { educationExperienceContainer } from "./EducationExperienceCard.module.scss";
import FeatherIcon from "feather-icons-react";

export default function EducationExperienceCard({ educationExperienceData: educationExperienceData }) 
{
    return (
        <div>
            <div className="mb-3">
                <div className={`${educationExperienceContainer}`}>
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <label>
                            {educationExperienceData.programOfStudy} @ {educationExperienceData.schoolName}
                            </label>
                            <a href={ `/EditEducationExperience?id=${educationExperienceData._id}` }>
                                <div className="cursor-pointer">
                                    <FeatherIcon icon="edit" stroke="#639FAB"></FeatherIcon>
                                </div>
                            </a>
                        </div>
                        <p>
                            {educationExperienceData.schoolAddress}, {educationExperienceData.schoolState} {educationExperienceData.schoolCity} {educationExperienceData.schoolCountry} 
                        </p>
                        <p>{ educationExperienceData.dateStarted } - { educationExperienceData.dateEnded }</p>
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                    </div>
                    <p>
                        { educationExperienceData.description }
                    </p>
                </div>
            </div>
        </div>
    );
}