import FeatherIcon from "feather-icons-react";
import AboutMeCard from "../../../components/AboutMeCard";

export default function AboutMe( { aboutMeData: aboutMeData } )
{
    return (
        <div className="mb-8">
            <div className="mb-4">
                <div className="flex items-center">
                    <FeatherIcon icon="user"></FeatherIcon>
                    <h2 className="font-bold ml-2">About Me</h2>
                </div>
            </div>
            { 
                aboutMeData &&
                    aboutMeData.map((aboutMeData, key) => 
                    {
                        return <AboutMeCard aboutMeData={aboutMeData} 
                            key={key}></AboutMeCard>;
                    })
            }
        </div>
    );
}