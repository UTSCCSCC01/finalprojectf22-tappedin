import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";

export default function ContactInfo() 
{
    const [ contactData, setContactData ] = useState<any>();

    useEffect(() => 
    {
        const userID: string = new URLSearchParams(
            window.location.search
        ).get("id");

        fetchContactInfo(userID);
    }, []);

    async function fetchContactInfo(userID: string): Promise<void> 
    {
        if (!userID)
            return;
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?field=8&idtype=3&id=" + userID;
        const config = {
            method: "get",
            url: url,
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setContactData(null);
            else setContactData(t.data[0]);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center mb-6">
                <FeatherIcon icon="info"></FeatherIcon>
                <h2 className="font-bold ml-2">Contact Info</h2>
            </div>
            {!contactData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h3>{"Contact Phone: N/A"}</h3>
                    <h3>{"Contact Email: N/A"}</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
            )}
        </div>
    );
}
