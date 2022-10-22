import {
    customBackground,
    editContainer,
} from "./EditEducationExperience.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";


export default function EditEducationExperiencePage() 
{
    const [ schoolName, setSchoolName ] = useState("");
    const [ schoolCountry, setSchoolCountry ] = useState("");
    const [ programOfStudy, setProgramOfStudy ] = useState("");
    const [ dateStarted, setDateStarted ] = useState("");
    const [ dateEnded, setDateEnded ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ schoolAddress, setSchoolAddress ] = useState("");
    const [ schoolState, setSchoolState ] = useState("");
    const [ schoolCity, setSchoolCity ] = useState("");
    const [ expectedGrad, setExpectedGrad ] = useState("");
    const [ currentlyAttending, setCurrentlyAttending ] = useState("");

    const [ isEdit, setIsEdit ] = useState(false);

    useEffect(() => 
    {
        const educationExperienceId = new URLSearchParams(
            window.location.search
        ).get("id");

        console.log(educationExperienceId);

        if (!educationExperienceId) return;

        setIsEdit(true);

        fetchEducationExperience(educationExperienceId).then((t) => 
        {
            setFormState(t);
        });
    }, []);

    function handleSubmit(): void 
    {
        if (!isEdit) createEducationExperience();
        else
            updateEducationExperience(
                new URLSearchParams(window.location.search).get("id")
            );

        window.open("/Dashboard", "_self"); // Redirect to Dashboard
    }

    function createEducationExperience(): void 
    {
        const data = getEducationExperienceJSON();

        const config = {
            method: "post",
            url: "http://localhost:3001/userFieldServices?field=0&idtype=1&id=testUser",
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

    function updateEducationExperience(educationExperienceId: string): void 
    {
        const data = getEducationExperienceJSON();

        const config = {
            method: "put",
            url: `http://localhost:3001/userFieldServices?field=0&objectid=${educationExperienceId}`,
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

    async function fetchEducationExperience(educationExperienceId): Promise<any> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=0&idtype=1&id=testUser",
            headers: {},
        };

        let educationExperience;

        try 
        {
            const res = await axios(config);
            educationExperience = res.data.filter(
                (t) => t._id == educationExperienceId
            )[0];
        }
        catch (e) 
        {
            console.error(e);
        }

        return educationExperience;
    }

    function getEducationExperienceJSON(): any 
    {
        const data = JSON.stringify({
            schoolName: schoolName,
            schoolCity: schoolCity,
            schoolState: schoolState,
            schoolCountry: schoolCountry,
            programOfStudy: programOfStudy,
            dateStarted: dateStarted,
            dateEnded: dateEnded,
            expectedGrad: expectedGrad,
            schoolAddress: schoolAddress,
            currentlyAttending: true,
            description: description,
        });

        return data;
    }

    function setFormState(t): void 
    {
        setSchoolName(t.schoolName);
        setSchoolCountry(t.schoolCountry);
        setProgramOfStudy(t.programOfStudy);
        setDateStarted(t.dateStarted);
        setDateEnded(t.dateEnded);
        setDescription(t.description);
        setSchoolAddress(t.schoolAddress);
        setSchoolState(t.schoolState);
        setSchoolCity(t.schoolCity);
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
                    <h1 className="font-bold mb-10">Add an education experience</h1>
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>School Name</label>
                            </div>
                            <input
                                type="text"
                                placeholder="University of Toronto"
                                value={schoolName}
                                onChange={(t) => setSchoolName(t.target.value)}
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
                                value={schoolAddress}
                                onChange={(t) => setSchoolAddress(t.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="mb-2">
                                <label>Province</label>
                            </div>
                            <input
                                type="text"
                                placeholder="ON"
                                value={schoolState}
                                onChange={(t) => setSchoolState(t.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2">
                                <label>City</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Welland"
                                value={schoolCity}
                                onChange={(t) => setSchoolCity(t.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2">
                                <label>Country</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Canada"
                                value={schoolCountry}
                                onChange={(t) => setSchoolCountry(t.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Field of Study</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Computer Science"
                                value={programOfStudy}
                                onChange={(t) =>
                                    setProgramOfStudy(t.target.value)
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