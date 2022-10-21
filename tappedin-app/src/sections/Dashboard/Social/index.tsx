import { 
    addSocialContainer 
} from "./Social.module.scss";

import FeatherIcon from "feather-icons-react";
import SocialCard from "../../../components/SocialCard";

export default function Social( { socialData: socialData } )
{
    return (
        <div>
            <div className="mb-3">
                <label>Socials</label>
            </div>
            { 
                socialData &&
                socialData.map((socialData, key) => 
                    {
                        return <SocialCard socialData={socialData} 
                            key={key}></SocialCard>;
                    })
            }
            <div
                className={`${addSocialContainer} 
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