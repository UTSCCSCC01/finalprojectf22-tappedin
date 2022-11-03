import { addContactInfoContainer } from "./ContactInfo.module.scss";

import FeatherIcon from "feather-icons-react";

export default function ContactInfo( { contactInfoData: data } )
{
    return (
        <div className="mb-8">            
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="phone"></FeatherIcon>
                    <h2 className="font-bold ml-2">Contact Info</h2>
                </div>
            </div>
            { 
                data &&
                    data.map((data, key) => 
                    {
                        return <ContactInfoBox contactInfoData={data} 
                            key={key}></ContactInfoBox>;
                    })
            }
            <div
                className={`${addContactInfoContainer} 
                                flex items-center justify-center mt-4`}
            >
                <a href="/EditContactInfo">
                    <div className="cursor-pointer">
                        <FeatherIcon
                            icon="plus"
                            size="54"
                            strokeWidth="1"
                            color="#BBCDE5"
                        />
                    </div>
                </a>
            </div>
        </div>
    );
}