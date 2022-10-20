import { workExperienceContainer } from "./WorkExperienceCard.module.scss";

export default function WorkExperienceCard({ data }) 
{
    return (
        <div>
            <div className="mb-3">
                <div className={`${workExperienceContainer}`}>
                    <div className="mb-6">
                        <label>
                            {data.workPositionName} @ {data.workName}
                        </label>
                        <p>
                            {data.workAddress}, {data.workState} {data.workCity} {data.workCountry} 
                        </p>
                        <p>{ data.dateStarted } - { data.dateEnded }</p>
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                    </div>
                    <p>
                        { data.description }
                    </p>
                </div>
            </div>
        </div>
    );
}
