import {
    customBackground,
    editContainer,
} from "./EditAboutMe.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FirebaseAuthenticationService } from "../../sdk/services/firebaseAuthenticationService";

export default function EditAboutMePage() 
{
    const [ aboutMeText, setAboutMeText ] = useState("");
    const [ isEdit, setIsEdit ] = useState(false);

    useEffect(() => 
    {
        const aboutMeId = new URLSearchParams(
            window.location.search
        ).get("id");

        console.log(aboutMeId);

        if (!aboutMeId) return;

        setIsEdit(true);

        fetchAboutMe(aboutMeId).then((t) => 
        {
            setFormState(t);
        });
    }, []);

    function handleSubmit(): void 
    {
        if (!isEdit) createAboutMe();
        else
            updateAboutMe(
                new URLSearchParams(window.location.search).get("id")
            );

        window.open("/Dashboard", "_self"); // Redirect to Dashboard
    }

    function createAboutMe(): void 
    {
        const data = getAboutMeJSON();
        const userID: string | null = (typeof localStorage !== "undefined") ? localStorage.getItem("userID") : null;

        if (!userID)
            return;
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=3&idtype=3&id=" + userID;

        const config = {
            method: "post",
            url: url,
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

    function updateAboutMe(aboutMeId: string): void 
    {
        const data = getAboutMeJSON();

        const config = {
            method: "put",
            url: `http://localhost:3001/userFieldServices?field=3&objectid=${aboutMeId}`,
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

    async function fetchAboutMe(aboutMeId): Promise<any> 
    {
        const userID: string | null = (typeof localStorage !== "undefined") ? localStorage.getItem("userID") : null;
        console.log(userID);
        if (!userID)
            return { aboutMeText: "" };
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=3&idtype=3&id=" + userID;
        console.log(url);
        const config = {
            method: "get",
            // FIXME: Change URL
            url: url,
            headers: {},
        };

        let aboutMe;

        try 
        {
            const res = await axios(config);
            aboutMe = res.data.filter(
                (t) => t._id == aboutMeId
            )[0];
        }
        catch (e) 
        {
            console.error(e);
        }
        
        if (!aboutMe)
            aboutMe = {};
        return aboutMe;
    }

    function getAboutMeJSON(): any 
    {
        const data = JSON.stringify({
            aboutMeText: aboutMeText
        });

        return data;
    }

    function setFormState(t): void 
    {
        setAboutMeText(t.aboutMeText);
    }

    return (
        <div className={`${customBackground}`}>
            <CoverImage imageURL={null}></CoverImage>
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
                    <h1 className="font-bold mb-10">Edit your about me</h1>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                    </div>
                    <div className="mb-6">
                        <div className="mb-2">
                            <label>About Me</label>
                        </div>
                        <textarea
                            name=""
                            id=""
                            cols={30}
                            rows={10}
                            placeholder="Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Tortor vitae
                            purus faucibus ornare suspendisse
                            sed nisi lacus sed. Sed egestas
                            egestas fringilla phasellus faucibus
                            scelerisque eleifend donec. Morbi
                            tempus iaculis urna id volutpat
                            lacus. Mattis molestie a iaculis at
                            erat pellentesque adipiscing commodo
                            elit. Imperdiet nulla malesuada
                            pellentesque elit. Volutpat blandit
                            aliquam etiam erat velit. Mollis
                            aliquam ut porttitor leo. Lacus
                            laoreet non curabitur gravida arcu
                            ac tortor dignissim convallis.
                            Cursus in hac habitasse platea
                            dictumst quisque. Vitae turpis massa
                            sed elementum tempus. Risus
                            ultricies tristique nulla aliquet
                            enim tortor. Neque aliquam
                            vestibulum morbi blandit cursus
                            risus at ultrices. Eget felis eget
                            nunc lobortis mattis aliquam
                            faucibus purus in. Turpis nunc eget
                            lorem dolor sed viverra ipsum nunc
                            aliquet."
                            value={aboutMeText}
                            onChange={(t) => setAboutMeText(t.target.value)}
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-4">
                        <button
                            className="button"
                            onClick={() => handleSubmit()}
                        >
                            {isEdit ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
