import {
    customBackground,
    editContainer,
} from "./EditSocials.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditSocialPage(socialData) 
{
    const [ facebookURL, setFacebookURL ] = useState("");
    const [ instagramURL, setInstagramURL ] = useState("");
    const [ twitterURL, setTwitterURL ] = useState("");
    const [ githubURL, setGithubURL ] = useState("");

    const [ isEmpty, setIsEmpty ] = useState(false);
    const [ socialsId, setSocialsId ] = useState("");

    useEffect(() => 
    {
        const socialId = new URLSearchParams(
            window.location.search
        ).get("id");
        fetchSocial().then((t) => 
        {
            setFormState(t);
        });
    }, []);

    function handleSubmit(): void 
    {
        if (isEmpty)
            createSocial();
        else 
            updateSocial(socialsId);

        window.open("/Dashboard", "_self"); // Redirect to Dashboard
    }

    function createSocial(): void 
    {
        const data = getSocialJSON();

        const config = {
            method: "post",
            url: "http://localhost:3001/userFieldServices?field=3&idtype=1&id=testUser",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) 
            {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    }

    function updateSocial(socialId: string): void 
    {
        const data = getSocialJSON();

        const config = {
            method: "put",
            url: `http://localhost:3001/userFieldServices?field=3&objectid=${socialId}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) 
            {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    }

    async function fetchSocial(): Promise<any> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=3&idtype=1&id=testUser",
            headers: {
                "Content-Type": "application/json",
            }
        };

        let social;

        try 
        {
            const res = await axios(config);

            if (res.data.length == 0)
            {
                setIsEmpty(true);
            }
            else
            {
                social = res.data[0];
                setSocialsId(social._id);
            }
                
        }
        catch (e) 
        {
            console.error(e);
        }

        return social;
    }

    function getSocialJSON(): any 
    {
        const data = JSON.stringify({
            facebookURL: facebookURL,
            instagramURL: instagramURL,
            twitterURL: twitterURL,
            githubURL: githubURL
            
        });

        return data;
    }

    function setFormState(t): void 
    {
        if (!t)
            return;

        setFacebookURL(t.facebookURL);
        setInstagramURL(t.instagramURL);
        setTwitterURL(t.twitterURL);
        setGithubURL(t.githubURL);
    }

    return (
        <div className={`${customBackground}`}>
            <CoverImage></CoverImage>
            <div className="container mx-auto">
                <div className={`${editContainer}`}>
                    <a href="/Dashboard">
                        <div className="flex items-center">
                            <FeatherIcon
                                icon="chevron-left"
                                stroke="#BBCDE5"
                            ></FeatherIcon>
                            <label className="is-lightblue cursor-pointer">
                                Back
                            </label>
                        </div>
                    </a>
                    <h1 className="font-bold mb-10">Edit social media information</h1>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Facebook URL</label>
                            </div>
                            <input
                                type="text"
                                placeholder="facebook.com/hackthevalley"
                                value={facebookURL}
                                onChange={(t) => setFacebookURL(t.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2">
                                <label>Instagram URL</label>
                            </div>
                            <input
                                type="text"
                                placeholder="instagram.com/hackthevalley"
                                value={instagramURL}
                                onChange={(t) => setInstagramURL(t.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2">
                                <label>Twitter URL</label>
                            </div>
                            <input
                                type="text"
                                placeholder="twitter.com/hackthevalley"
                                value={twitterURL}
                                onChange={(t) => setTwitterURL(t.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2">
                                <label>Github URL</label>
                            </div>
                            <input
                                type="text"
                                placeholder="github.com/hackthevalley"
                                value={githubURL}
                                onChange={(t) => setGithubURL(t.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-4">
                        <button
                            className="button"
                            onClick={() => handleSubmit()}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
