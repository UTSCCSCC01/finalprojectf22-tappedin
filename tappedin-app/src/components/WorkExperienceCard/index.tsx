import { workExperienceContainer } from "./WorkExperienceCard.module.scss";

export default function WorkExperienceCard({ workExperienceData: workExperienceData }) 
{
    return (
        <div>
            <div className="mb-3">
                <div className={`${workExperienceContainer}`}>
                    <div className="mb-6">
                        <label>
                            {workExperienceData.workPositionName} @ {workExperienceData.workName}
                        </label>
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
