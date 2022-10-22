import {
    customBackground,
    editContainer,
} from "./EditInterests.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditInterestsPage() 
{
    const [ description, setDescription ] = useState("");
    const [ interestName, setInterestName ] = useState("");

    useEffect(() =>
    {
        const interestId = new URLSearchParams(
            window.location.search
        ).get("id");

        if (!interestId) return;

        fetchInterests(interestId).then((t) => 
        {
            setFormState(t);
        });
    }, []);

    function handleSubmit(): void
    {
        var data = JSON.stringify({
            "interestName": interestName,
            "description": description,
        });
        var interestId = new URLSearchParams(window.location.search).get("id");
        if (interestId === null)
        {
            var config = {
                method: "post",
                url: "http://localhost:3001/userFieldServices?field=2&idtype=1&id=testUser",
                headers: { 
                    "Content-Type": "application/json"
                },
                data : data
            };
        }
        else
        {
            var config = {
                method: "put",
                url: `http://localhost:3001/userFieldServices?field=2&objectid=${interestId}`,
                headers: { 
                    "Content-Type": "application/json"
                },
                data : data
            };
        }

        axios(config)
            .then(function (response) 
            {
                window.open("/Dashboard", "_self");
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    }

    function handleDelete(): void
    {
        // TODO: DELETE requests are not yet implemented
        var interestId = new URLSearchParams(window.location.search).get("id");
        if (interestId !== null)
        {
            var config = {
                method: "delete",
                url: `http://localhost:3001/userFieldServices?field=2&objectid=${interestId}`,
                headers: { 
                    "Content-Type": "application/json"
                },
            };
        }
        axios(config)
            .then(function (response) 
            {
                window.open("/Dashboard", "_self");
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    }

    async function fetchInterests(interestId): Promise<any>
    {        
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=2&idtype=1&id=testUser",
            headers: {},
        };

        let interests;

        try 
        {
            const res = await axios(config);
            interests = res.data.filter(
                (t) => t._id == interestId
            )[0];
        }
        catch (e) 
        {
            console.error(e);
        }

        return interests;
    }

    function setFormState(t): void 
    {
        setInterestName(t.interestName);
        setDescription(t.description);
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
                    <h1 className="font-bold mb-10">Edit your interests</h1>
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Interest Name</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Setting up my TappedIn profile"
                                value={interestName}
                                onChange={(t) => setInterestName(t.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="mb-2">
                            <label>Description</label>
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
                            value={description}
                            onChange={ (t) => setDescription(t.target.value) }
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-4">
                        <button className="button" onClick={() => handleSubmit()}>Save</button>
                        <div></div>
                        <div></div>
                        {/* <button className="button" onClick={() => handleDelete()}>Delete</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
