import FeatherIcon from "feather-icons-react";
import AboutMeCard from "../../../components/AboutMeCard";
import { 
    addAboutMeContainer
} from "./AboutMe.module.scss";

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
            {console.log(aboutMeData)}
            { (!aboutMeData || aboutMeData.length == 0) ? 
                (<div
                    className={`${addAboutMeContainer}
                                    flex items-center justify-center`}
                >
                    <a href="/EditAboutMe">
                        <div className="cursor-pointer">
                            <FeatherIcon
                                icon="plus"
                                size="54"
                                strokeWidth="1"
                                color="#BBCDE5"
                            />
                        </div>
                    </a>
                </div>) :
                (
                    aboutMeData.map((aboutMeData, key) => 
                    {
                        return <AboutMeCard aboutMeData={aboutMeData} 
                            key={key}></AboutMeCard>;
                    })
                )}
        </div>
    );
}