import { profileImageContainer, lineBreak } from "./PublicProfile.module.scss";

import CoverImage from "../../components/CoverImage";
import WorkExperience from "../../sections/PublicProfile/WorkExperience";
import FeatherIcon from "feather-icons-react";
import EducationExperience from "../../sections/PublicProfile/EducationExperience";
import ContactInfo from "../../sections/PublicProfile/ContactInfo";

export default function PublicProfile() 
{
    return (
        <div>
            <CoverImage size="lg"></CoverImage>
            <div className="container mx-auto px-5 md:px-0">
                <div className="grid grid-cols-5 mb-8">
                    <div className="col-span-2">
                        <div className={`${profileImageContainer}`}></div>
                    </div>
                    <div className="col-span-1 md:col-span-2"></div>
                    <button className="button col-span-2 md:col-span-1">
                        Connect
                    </button>
                </div>

                <div className="grid grid-cols-3 mb-12">
                    <div className="col-span-3 md:col-span-2">
                        <h1 className="title">Ben Saobuppha</h1>
                        <h3>
                            “Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Aliquet risus feugiat in ante.”
                        </h3>
                    </div>
                </div>

                <div className="mb-12">
                    {/* TODO: Insert Social Content Here */}
                </div>

                <div className={`${lineBreak} mb-12`}></div>

                <div>
                    <h1 className="font-bold text-4xl mb-8">Info</h1>
                    {/* TODO: Insert Other Content Here */}
                    <ContactInfo></ContactInfo>
                    <WorkExperience></WorkExperience>
                    <EducationExperience></EducationExperience>
                    <div className="py-3"></div>
                </div>
            </div>
        </div>
    );
}
