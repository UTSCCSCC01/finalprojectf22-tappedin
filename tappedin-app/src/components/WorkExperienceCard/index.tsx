import { 
    workExperienceContainer 
} from "./WorkExperienceCard.module.scss";

import FeatherIcon from "feather-icons-react";

export default function WorkExperienceCard({ workExperienceData: workExperienceData }) 
{
    return (
        <div>
            <div className="mb-3">
                <div className={`${workExperienceContainer}`}>
                    <div className="mb-6">
                        <div className="flex justify-between">
                            <label>
                                {workExperienceData.workPositionName} @ {workExperienceData.workName}
                            </label>
                            <a href={ `/EditWorkExperience?id=${workExperienceData._id}` }>
                                <div className="cursor-pointer">
                                    <FeatherIcon icon="edit" stroke="#639FAB"></FeatherIcon>
                                </div>
                            </a>
                            
                        </div>
                        <p>
                            {workExperienceData.workAddress}, {workExperienceData.workState} {workExperienceData.workCity} {workExperienceData.workCountry} 
                        </p>
                        <p>{ workExperienceData.dateStarted } - { workExperienceData.dateEnded }</p>
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                    </div>
                    <p>
                        { workExperienceData.description }
                    </p>
                </div>
            </div>
        </div>
    );
}
