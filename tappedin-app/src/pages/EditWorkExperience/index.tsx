import {
    customBackground,
    editContainer,
} from "./EditWorkExperience.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditWorkExperiencePage() 
{
    const [ workName, setWorkName ] = useState("");
    const [ workCountry, setWorkCountry ] = useState("");
    const [ workPositionName, setWorkPositionName ] = useState("");
    const [ dateStarted, setDateStarted ] = useState("");
    const [ dateEnded, setDateEnded ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ workAddress, setWorkAddress ] = useState("");
    const [ workState, setWorkState ] = useState("");
    const [ workCity, setWorkCity ] = useState("");

    const [ isEdit, setIsEdit ] = useState(false);

    useEffect(() => 
    {
        const workExperienceId = new URLSearchParams(
            window.location.search
        ).get("id");

        console.log(workExperienceId);

        if (!workExperienceId) return;

        setIsEdit(true);

        fetchWorkExperience(workExperienceId).then((t) => 
        {
            setFormState(t);
        });
    }, []);

    function handleSubmit(): void 
    {
        if (!isEdit) createWorkExperience();
        else
            updateWorkExperience(
                new URLSearchParams(window.location.search).get("id")
            );

        window.open("/Dashboard", "_self"); // Redirect to Dashboard
    }

    function createWorkExperience(): void 
    {
        const data = getWorkExperienceJSON();

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

    function updateWorkExperience(workExperienceId: string): void 
    {
        const data = getWorkExperienceJSON();

        const config = {
            method: "put",
            url: `http://localhost:3001/userFieldServices?field=1&objectid=${workExperienceId}`,
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

    async function fetchWorkExperience(workExperienceId): Promise<any> 
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
                (t) => t._id == workExperienceId
            )[0];
        }
        catch (e) 
        {
            console.error(e);
        }

        return workExperience;
    }

    function getWorkExperienceJSON(): any 
    {
        const data = JSON.stringify({
            workName: workName,
            workCountry: workCountry,
            workPositionName: workPositionName,
            dateStarted: dateStarted,
            dateEnded: dateEnded,
            description: description,
            workAddress: workAddress,
            workState: workState,
            workCity: workCity,
            currentlyWorking: true,
        });

        return data;
    }

    function setFormState(t): void 
    {
        setWorkName(t.workName);
        setWorkCountry(t.workCountry);
        setWorkPositionName(t.workPositionName);
        setDateStarted(t.dateStarted);
        setDateEnded(t.dateEnded);
        setDescription(t.description);
        setWorkAddress(t.workAddress);
        setWorkState(t.workState);
        setWorkCity(t.workCity);
    }

    return (
        <div className={`${customBackground}`}>
            <CoverImage imgData={null}></CoverImage>
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
                    <h1 className="font-bold mb-10">Add a work experience</h1>
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Company Name</label>
                            </div>
                            <input
                                type="text"
                                placeholder="ABC Inc."
                                value={workName}
                                onChange={(t) => setWorkName(t.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Start Date</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Jan, 2022"
                                value={dateStarted}
                                onChange={(t) => setDateStarted(t.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2">
                                <label>End Date</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Dec, 2022"
                                value={dateEnded}
                                onChange={(t) => setDateEnded(t.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-10 gap-4 mb-6">
                        <div className="col-span-5">
                            <div className="mb-2">
                                <label>Address</label>
                            </div>
                            <input
                                type="text"
                                placeholder="123 Street St"
                                value={workAddress}
                                onChange={(t) => setWorkAddress(t.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="mb-2">
                                <label>Province</label>
                            </div>
                            <input
                                type="text"
                                placeholder="ON"
                                value={workState}
                                onChange={(t) => setWorkState(t.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2">
                                <label>City</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Welland"
                                value={workCity}
                                onChange={(t) => setWorkCity(t.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2">
                                <label>Country</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Canada"
                                value={workCountry}
                                onChange={(t) => setWorkCountry(t.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Position</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Software Engineer"
                                value={workPositionName}
                                onChange={(t) =>
                                    setWorkPositionName(t.target.value)
                                }
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
                            onChange={(t) => setDescription(t.target.value)}
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
