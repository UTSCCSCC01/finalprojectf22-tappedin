import { 
    customBackground,
    customBanner,
    editContainer,
    customNavbar
} from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import CoverImage from "../../components/CoverImage";
import EditCover from "../../sections/Dashboard/EditCoverimage";
import axios from "axios";

export default function DashboardPage()
{
    
    const [covImg, setCovImg] = useState("");

    const fetchCoverImage = async (): Promise<void> => {
        const config = {
            method: "get",
            url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
            headers: {}
        };

        try 
        {
            const res = await axios(config);
            setCovImg(res.data.fileDataURL);
            return ;
        } 
        catch (e) 
        {
            console.log(e); 
        }
    }

    useEffect(() => 
    {
        fetchCoverImage();
    },[]) 

    return (
        <div className={ `${customBackground}` }>
            <CoverImage imgDataURL={covImg}/>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-4">
                    <div className={ `${customNavbar} justify-center mb-10` }>
                        <h1 className="font-bold text-center">
                                    Tapped
                            <span style={{ color: "#639FAB" }}>
                                        In.
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">
                            Edit
                        </h1>
                        <div className={ `${editContainer}` }>
                            {/* TODO: Insert Content Here */}
                            <EditCover imgDataURL={covImg}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}