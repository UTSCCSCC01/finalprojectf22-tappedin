import { 
    aboutMeContainer 
} from "./AboutMeCard.module.scss";

import FeatherIcon from "feather-icons-react";

export default function AboutMeCard({ aboutMeData: aboutMeData }) 
{
    return (
        <div>
            <div className="mb-3">
                <div className={`${aboutMeContainer}`}>
                    <div className="mb-6">
                        <p className="pre-wrap">
                            { aboutMeData.aboutMeText }
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <a href={ `/EditAboutMe?id=${aboutMeData._id}` }>
                            <div className="cursor-pointer">
                                <FeatherIcon icon="edit" stroke="#639FAB"></FeatherIcon>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
