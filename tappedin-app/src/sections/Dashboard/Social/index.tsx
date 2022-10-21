import { 
    addSocialContainer 
} from "./Social.module.scss";

import FeatherIcon from "feather-icons-react";
import SocialCard from "../../../components/SocialCard";

export default function Social( { socialData: socialData } )
{
    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="globe"></FeatherIcon>
                    <h2 className="font-bold ml-2">Socials</h2>
                </div>
                
            </div>
            {/* { 
                socialData &&
                socialData.map((socialData, key) => 
                    {
                        return <SocialCard socialData={socialData} 
                            key={key}></SocialCard>;
                    })
            } */}
            <div className=" grid grid-cols-4 gap-5 content-start">

            
                <div
                    className={`${addSocialContainer} 
                                    flex items-center justify-center`}
                >
                    
                    
                    <a href="/EditSocials">
                        <div className="cursor-pointer">
                            <FeatherIcon
                                icon="facebook"
                                size="54"
                                strokeWidth="1"
                                color="#BBCDE5"
                            />
                        </div>
                    </a>
                </div>
                <div
                    className={`${addSocialContainer} 
                                    flex items-center justify-center`}
                >
                    
                    
                    
                    <a href="/EditSocials">
                        <div className="cursor-pointer">
                            <FeatherIcon
                                icon="instagram"
                                size="54"
                                strokeWidth="1"
                                color="#BBCDE5"
                            />
                        </div>
                    </a>
                </div>
                <div
                    className={`${addSocialContainer} 
                                    flex items-center justify-center`}
                >
                    
                    
                    <a href="/EditSocials">
                        <div className="cursor-pointer">
                            <FeatherIcon
                                icon="twitter"
                                size="54"
                                strokeWidth="1"
                                color="#BBCDE5"
                            />
                        </div>
                    </a>
                </div>
                <div
                    className={`${addSocialContainer} 
                                    flex items-center justify-center`}
                >
                    
                    
                    <a href="/EditSocials">
                        <div className="cursor-pointer">
                            <FeatherIcon
                                icon="edit"
                                size="54"
                                strokeWidth="1"
                                color="#BBCDE5"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}