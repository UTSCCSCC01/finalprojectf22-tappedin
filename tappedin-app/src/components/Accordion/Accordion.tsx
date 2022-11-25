import {
    accordionTitle
} from "./Accordion.module.scss";

import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";

const Accordion = ({ title, content }) => 
{
    const [ isActive, setIsActive ] = useState(false);

    return (
        <div className="accordion-item pb-8">
            <div className={`${accordionTitle}`} onClick={() => setIsActive(!isActive)}>
                <div className="flex justify-between">
                    <h2 className="pb-4">{title}</h2>
                    <div className="flex align-center pt-2">
                        {
                            isActive ? <FeatherIcon icon="chevron-down"></FeatherIcon> :
                                <FeatherIcon icon="chevron-up"></FeatherIcon>
                        }
                    </div>
                    
                </div>
                <hr style={{ background: "#E8E5E5", height: "1px", }}/>
            </div>
            {
                isActive && <div className="p-8 text-gray-400">
                    <p>{content}</p>
                </div>
            }
        </div>
    );
};

export default Accordion;