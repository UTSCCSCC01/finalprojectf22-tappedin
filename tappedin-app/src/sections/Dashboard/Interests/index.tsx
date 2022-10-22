import { 
    addInterestContainer 
} from "./Interests.module.scss";

import FeatherIcon from "feather-icons-react";
import InterestsBox from "../../../components/InterestsBox";

export default function Interests( { interestsData: data } )
{
    return (
        <div>
            <div className="flex justify-between">
                <div className="mb-3">
                    <label>Interests</label>
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