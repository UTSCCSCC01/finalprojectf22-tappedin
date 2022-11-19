import {
    signInContainer,
    profileImageContainerSmall,
} from "./SignInModule.module.scss";

import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import axios from "axios";

export default function SignInModule() 
{
    const [ signedInUserFullName, setSignedInFullUserName ] = useState("");
    const [ moduleIsOpen, setModuleIsOpen ] = useState(false);

    useEffect(() => 
    {
        fetchSignedInUserFullName();
    }, []);

    async function fetchSignedInUserFullName(): Promise<void> 
    {
        const baseURL =
            process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?";

        const userId =
            typeof localStorage !== "undefined"
                ? localStorage.getItem("userID")
                : null;

        if (!userId) return;

        const config = {
            method: "get",
            url: `${baseURL}field=7&idtype=3&id=${userId}`,
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404) return;
            else 
            {
                setSignedInFullUserName(
                    `${t.data[0].firstName} ${t.data[0].lastName}`
                );
            }
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    function gotoSignIn(): void
    {
        window.open("/Login", "_self");
    }

    function gotoDashboard(): void
    {
        window.open("/Dashboard", "_self");
    }

    return (
        <div className={`${signInContainer}`}>
            {(!moduleIsOpen && (
                <div className="cursor-pointer" onClick={() => setModuleIsOpen(true)}>
                    <FeatherIcon icon="plus" stroke="#95D5E2"></FeatherIcon>
                </div>
            )) ||
                (moduleIsOpen && signedInUserFullName == "" && (
                    <div>
                        <div className="mb-4">
                            <div className="flex items-start justify-end">
                                <div className="cursor-pointer" onClick={() => setModuleIsOpen(false)}>
                                    <FeatherIcon
                                        icon="minus"
                                        stroke="#95D5E2"
                                    ></FeatherIcon>
                                </div>
                            </div>
                            <div className="flex items-center px-16">
                                <h3 className="font-bold">Not Signed In</h3>
                            </div>
                        </div>
                        <button className="button" onClick={() => gotoSignIn()}>Sign In</button>
                    </div>
                )) ||
                (moduleIsOpen && signedInUserFullName && (
                    <div>
                        <div className="mb-4">
                            <div className="flex items-start justify-end">
                                <div className="cursor-pointer" onClick={() => setModuleIsOpen(false)}>
                                    <FeatherIcon
                                        icon="minus"
                                        stroke="#95D5E2"
                                    ></FeatherIcon>
                                </div>
                            </div>
                            <div className="flex items-center mr-16">
                                <div
                                    className={`${profileImageContainerSmall} mr-4`}
                                ></div>
                                <h3 className="font-bold">
                                    {signedInUserFullName}
                                </h3>
                            </div>
                        </div>
                        <button className="button" onClick={() => gotoDashboard()}>Dashboard</button>
                    </div>
                ))}
        </div>
    );
}
