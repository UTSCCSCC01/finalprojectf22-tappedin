import { interestsContainer } from "./InterestsBox.module.scss";
import FeatherIcon from "feather-icons-react";

export default function InterestsBox({ interestsData: data }) 
{
    return (
        <div>
            <div className="mb-3">
                <div className={`${interestsContainer}`}>
                    <div className="flex justify-between">
                        <label>{ data.interestName }</label>
                        <a href={ `/EditInterests?id=${data._id}` }>
                            <div className="cursor-pointer">
                                <FeatherIcon icon="edit" stroke="#639FAB"></FeatherIcon>
                            </div>
                        </a>
                    </div>
                    <p className="pre-wrap">
                        { data.description }
                    </p>
                </div>
            </div>
        </div>
    );
}
