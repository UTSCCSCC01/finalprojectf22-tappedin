import { 
    addSocialContainer, disabled
} from "./Social.module.scss";

import FeatherIcon from "feather-icons-react";
import SocialCard from "../../../components/SocialCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Social( { socialData: socialData } )
{
    const [ hasFacebook, setHasFacebook ] = useState(false);
    const [ facebookURL, setFacebookURL ] = useState("");

    const [ hasInstagram, setHasInstagram ] = useState(false);
    const [ instagramURL, setInstagramURL ] = useState("");

    const [ hasTwitter, setHasTwitter ] = useState(false);
    const [ twitterURL, setTwitterURL ] = useState("");

    const [ hasGithub, setHasGithub ] = useState(false);
    const [ githubURL, setGithubURL ] = useState("");
    useEffect(() => 
    {
        const userID: string = new URLSearchParams(
            window.location.search
        ).get("id");
        fetchSocial(userID);
    }, []);

    async function fetchSocial(userID: string): Promise<any> 
    {
        // const userID: string | null = (typeof localStorage !== "undefined") ? localStorage.getItem("userID") : null;

        if (!userID)
            return;
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=4&idtype=3&id=" + userID;
        const config = {
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
            }
        };

        let social;

        try 
        {
            const res = await axios(config);

            if (res.data.length == 0)
                return;
            else
            {
                social = res.data[0];
                
                if (social.facebookURL)
                    setHasFacebook(true);
                setFacebookURL(social.facebookURL);
                
                if (social.instagramURL)
                    setHasInstagram(true);
                setInstagramURL(social.instagramURL);

                if (social.twitterURL)
                    setHasTwitter(true);
                setTwitterURL(social.twitterURL);

                if (social.githubURL)
                    setHasGithub(true);
                setGithubURL(social.githubURL);
            
            }
                
        }
        catch (e) 
        {
            console.error(e);
        }

        return social;
    }

    return (
        <div className="mb-8">
            <div className="mb-2">
                <div className="flex items-center">
                    <FeatherIcon icon="globe"></FeatherIcon>
                    <h2 className="font-bold ml-2">Socials</h2>
                </div>
                
            </div>
            <div className=" grid grid-cols-4 w-fit gap-4">

            
                <div
                    className={`${addSocialContainer} ${!hasFacebook ? disabled : ""}
                                    flex items-center justify-center`}
                >
                    
                    
                    <a href={ `https://${facebookURL}` }>
                        <div className={!hasFacebook ? "cursor-not-allowed" : "cursor-pointer"}>
                            <FeatherIcon
                                icon="facebook"
                                size="32"
                                strokeWidth="1"
                                color={!hasFacebook ? "#95989b" : "#BBCDE5"}
                            />
                        </div>
                    </a>
                </div>
                <div
                    className={`${addSocialContainer} ${!hasInstagram ? disabled : ""}
                                    flex items-center justify-center`}
                >
                    
                    
                    
                    <a href={ `https://${instagramURL}` }>
                        <div className={!hasInstagram ? "cursor-not-allowed" : "cursor-pointer"}>
                            <FeatherIcon
                                icon="instagram"
                                size="32"
                                strokeWidth="1"
                                color={!hasInstagram ? "#95989b" : "#BBCDE5"}
                            />
                        </div>
                    </a>
                </div>
                <div
                    className={`${addSocialContainer} ${!hasTwitter ? disabled : ""}
                                    flex items-center justify-center`}
                >
                    
                    
                    <a href={ `https://${twitterURL}` }>
                        <div className={!hasInstagram ? "cursor-not-allowed" : "cursor-pointer"}>
                            <FeatherIcon
                                icon="twitter"
                                size="32"
                                strokeWidth="1"
                                color={!hasTwitter ? "#95989b" : "#BBCDE5"}
                            />
                        </div>
                    </a>
                </div>
                <div
                    className={`${addSocialContainer} ${!hasGithub ? disabled : ""}
                                    flex items-center justify-center`}
                >
                    
                    
                    <a href={ `https://${githubURL}` }>
                        <div className={!hasGithub ? "cursor-not-allowed" : "cursor-pointer"}>
                            <FeatherIcon
                                icon="github"
                                size="32"
                                strokeWidth="1"
                                color={!hasGithub ? "#95989b" : "#BBCDE5"}
                            />
                        </div>
                    </a>
                </div>
                
            </div>
        </div>
    );
}