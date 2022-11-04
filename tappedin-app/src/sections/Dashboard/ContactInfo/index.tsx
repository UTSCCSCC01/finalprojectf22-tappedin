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

        var config = {
            method: `${contactData ? "put" : "post"}`,
            url: `${ // TODO non-hardcoded test user here
                contactData ? `http://localhost:3001/userFieldServices?field=7&objectid=${contactData._id}`
                    : "http://localhost:3001/userFieldServices?field=7&idtype=1&id=testUser"
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
                    <FeatherIcon icon="phone"></FeatherIcon>
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
                            <h3>{"Contact Phone: " + contactData.phone}</h3>
                        ) : (
                            <h3>{"Contact Phone: N/A"}</h3>
                        )}
                        { contactData.email !== "" ? (
                            <h3>{"Contact Email: " + contactData.email}</h3>
                        ) : (
                            <h3>{"Contact Email: N/A"}</h3>
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