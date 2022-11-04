import { addContactInfoContainer } from "./ContactInfo.module.scss";

import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import axios from "axios";

export default function ContactInfo({ contactInfoData: contactData }) 
{
    const [ isEdit, setIsEdit ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ phone, setPhone ] = useState("");

    function handleSubmit(): void
    {
        console.log(contactData); // DEBUG
        const data = JSON.stringify({
            "email": email,
            "phone": phone,
        });
        const userID: string | null = (typeof localStorage !== "undefined") ? localStorage.getItem("userID") : null;

        var config = {
            method: `${contactData ? "put" : "post"}`,
            url: `${
                contactData ? process.env.NEXT_PUBLIC_SERVER_ADDRESS +  `/userFieldServices?field=8&objectid=${contactData._id}`
                    : process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=8&idtype=3&id=" + userID                  
            }`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config).then(() => window.location.reload());
        setIsEdit(false);
    }

    return (
        <div className="mb-8">
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="info"></FeatherIcon>
                    <h2 className="font-bold ml-2">Contact Info</h2>
                </div>
            </div>
            {!isEdit && (!contactData) ? (
                <div
                    className={`${addContactInfoContainer} 
                            flex items-center`}
                >
                    <div
                        className="cursor-pointer"
                        onClick={() => setIsEdit(true)}
                    >
                        <FeatherIcon
                            icon="plus"
                            size="54"
                            strokeWidth="1"
                            color="#BBCDE5"
                        />
                    </div>
                </div>
            ) : isEdit ? (
                <div>
                    <input
                        type="text"
                        className="mb-3"
                        placeholder="(123)456-7890"
                        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" // TODO check regex on submit
                        value={phone}
                        onChange={(t) => setPhone(t.target.value)}
                    />
                    <input
                        type="email"
                        className="mb-3"
                        placeholder="email@domain.com"
                        pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" // TODO check regex on submit
                        value={email}
                        onChange={(t) => setEmail(t.target.value)}
                    />
                    <div className="grid grid-cols-3">
                        <button
                            className="button"
                            onClick={() => handleSubmit()}
                        >
                        Update
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center">
                        { contactData.phone !== "" ? (
                            <div className="flex item-center">
                                <FeatherIcon icon="phone"></FeatherIcon>
                                <h3 className="ml-4">{contactData.phone}</h3>
                            </div>
                        ) : (
                            <div className="flex item-center">
                                <FeatherIcon icon="phone"></FeatherIcon>
                                <h3 className="ml-4">N/A</h3>
                            </div>
                        )}
                        { contactData.email !== "" ? (
                            <div className="flex item-center">
                                <FeatherIcon icon="mail"></FeatherIcon>
                                <h3 className="ml-4">{contactData.email}</h3>
                            </div>
                        ) : (
                            <div className="flex item-center">
                                <FeatherIcon icon="mail"></FeatherIcon>
                                <h3 className="ml-4">N/A</h3>
                            </div>
                        )}
                        <div
                            className="cursor-pointer"
                            onClick={() => 
                            {
                                setIsEdit(true);
                                setPhone(contactData.phone);
                                setEmail(contactData.email);
                            }}
                        >
                            <FeatherIcon
                                icon="edit"
                                stroke="#639FAB"
                            ></FeatherIcon>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}