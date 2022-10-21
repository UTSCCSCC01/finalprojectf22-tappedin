import {
    customBackground,
    editContainer,
} from "./EditSocials.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditSocialPage() 
{
    const [ facebookURL, setFacebookURL ] = useState("");
    const [ instagramURL, setInstagramURL ] = useState("");
    const [ twitterURL, setTwitterURL ] = useState("");
    const [ githubURL, setGithubURL ] = useState("");


    
    const [ isEdit, setIsEdit ] = useState(false);

    useEffect(() => 
    {
        const socialId = new URLSearchParams(
            window.location.search
        ).get("id");

        console.log(socialId);

        if (!socialId) return;

        setIsEdit(true);

        fetchSocial(socialId).then((t) => 
        {
            setFormState(t);
        });
    }, []);

    function handleSubmit(): void 
    {
        if (!isEdit) createSocial();
        else
            updateSocial(
                new URLSearchParams(window.location.search).get("id")
            );

        window.open("/Dashboard", "_self"); // Redirect to Dashboard
    }

    function createSocial(): void 
    {
        const data = getSocialJSON();

        const config = {
            method: "post",
            url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
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
            url: `http://localhost:3001/userFieldServices?field=1&objectid=${socialId}`,
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

    async function fetchSocial(socialId): Promise<any> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
            headers: {},
        };

        let workExperience;

        try 
        {
            const res = await axios(config);
            workExperience = res.data.filter(
                (t) => t._id == socialId
            )[0];
        }
        catch (e) 
        {
            console.error(e);
        }

        return workExperience;
    }

    function getSocialJSON(): any 
    {
        const data = JSON.stringify({
            facebookURL: facebookURL,
            instagramURL: instagramURL,
            twitterURL: twitterURL,
            
        });

        return data;
    }

    function setFormState(t): void 
    {
        setFacebookURL(t.facebookURL);
        setInstagramURL(t.instagramURL);
        
        
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
                                placeholder="URL"
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
                                placeholder="URL"
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
                                placeholder="URL"
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
                                placeholder="URL"
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
