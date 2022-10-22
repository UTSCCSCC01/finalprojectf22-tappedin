import { 
    addInterestContainer 
} from "./Interests.module.scss";

import FeatherIcon from "feather-icons-react";
import InterestsBox from "../../../components/InterestsBox";

export default function Interests( { interestsData: data } )
{
    return (
        <div className="mb-6">            
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="dribbble"></FeatherIcon>
                    <h2 className="font-bold ml-2">Interests</h2>
                </div>
            </div>
            { 
                data &&
                    data.map((data, key) => 
                    {
                        return <InterestsBox interestsData={data} 
                            key={key}></InterestsBox>;
                    })
            }
            <div
                className={`${addInterestContainer} 
                                flex items-center justify-center`}
            >
                <a href="/EditInterests">
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