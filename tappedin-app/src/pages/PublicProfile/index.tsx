import { profileImageContainer, lineBreak } from "./PublicProfile.module.scss";

import CoverImage from "../../components/CoverImage";
import Location from "../../sections/PublicProfile/Location";
import AboutMe from "../../sections/PublicProfile/AboutMe";
import WorkExperience from "../../sections/PublicProfile/WorkExperience";
import EducationExperience from "../../sections/PublicProfile/EducationExperience";
import ContactInfo from "../../sections/PublicProfile/ContactInfo";
import Interests from "../../sections/PublicProfile/Interests";
import Socials from "../../sections/PublicProfile/Socials";
import { useEffect, useState } from "react";
import axios from "axios";
import SignInModule from "../../components/SignInModule";
import Posts from "../../sections/PublicProfile/Posts";

export default function PublicProfile() 
{
    const baseURL =
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices?";

    const [ friends, setFriends ] = useState([]);
    const [ fullName, setFullName ] = useState("");
    const [ userId, setUserId ] = useState("");
    const currentId =
    typeof localStorage !== "undefined"
        ? localStorage.getItem("userID")
        : null;

    useEffect(() => 
    {
        setUserId(new URLSearchParams(window.location.search).get("id"));

        fetchFullName();
        fetchFriends();
    }, []);

    async function fetchFullName(): Promise<void> 
    {
        const userId = new URLSearchParams(window.location.search).get("id");

        const config = {
            method: "get",
            url: baseURL + "field=7&idtype=3&id=" + userId,
            headers: {},
            validateStatus: (status) => 
            {
                return status < 500;
            },
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404) setFullName("");
            else 
            {
                setFullName(`${t.data[0].firstName} ${t.data[0].lastName}`);
            }
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function fetchFriends(): Promise<void>
    {        
        const config = {
            method: "get",
            url: process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/friendService/getFriends?id=" + currentId,
            headers: {},
            validateStatus: (status) => 
            {
                return status < 500;
            },
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404) setFriends([]);
            else 
            {
                var friendList = [];
                for (var f of t.data)
                {
                    for (const [ key, value ] of Object.entries(f))
                    {
                        if (key === "authID" || key === "friendAuthID" )
                        {
                            friendList.push(value);
                        }
                    }
                }
                setFriends(friendList);
            }
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => 
    {
        if (!currentId) // TODO notify user they're not logged in
            return;

        var data = JSON.stringify({
            "id": currentId,
            "friend": userId
        });
        
        const url = process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/friendService/addFriend";
        var config = {
            method: "post",
            url: url,
            headers: { 
                "Content-Type": "application/json"
            },
            data : data
        };

        axios(config)
            .then(function (response) 
            {
                window.open("/PublicProfile?id="+userId, "_self");
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    };

    return (
        <div>
            <CoverImage size="lg" publicProfile={true}></CoverImage>
            <div className="container mx-auto px-5 md:px-0">
                <div className="grid grid-cols-5 mb-8">
                    <div className="col-span-2">
                        <div className={`${profileImageContainer}`}></div>
                    </div>
                    <div className="col-span-1 md:col-span-2"></div>
                    { ( userId === currentId ? (                        
                        <div className="col-span-2 md:col-span-1"></div>
                    ) : friends.includes(userId) ? (
                        <button className="button is-blue col-span-2 md:col-span-1" disabled>
                            {/* TODO: Unfriend function once DELETE requests are implemented */}
                            Connected!
                        </button>
                    ) : (
                        <button className="button col-span-2 md:col-span-1" type="submit" onClick={(e) => handleSubmit(e)}>
                            Connect
                        </button>
                    ))};
                </div>

                <div className="grid grid-cols-3 mb-12">
                    <div className="col-span-3 md:col-span-2">
                        <h1 className="title">{fullName}</h1>
                        <h3>
                            “Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Aliquet risus feugiat in ante.”
                        </h3>
                    </div>
                </div>

                <div className="mb-12">
                    {/* TODO: Insert Social Content Here */}
                    <Socials></Socials>
                </div>

                <div className={`${lineBreak} mb-12`}></div>

                <div>
                    <h1 className="font-bold text-4xl mb-8">Info</h1>
                    {/* TODO: Insert Other Content Here */}
                    <AboutMe></AboutMe>
                    <ContactInfo></ContactInfo>
                    <WorkExperience></WorkExperience>
                    <EducationExperience></EducationExperience>
                    <Location></Location>
                    <Interests></Interests>
                    {userId && <Posts userId={userId}></Posts>}
                    <div className="py-3"></div>
                </div>

                <SignInModule></SignInModule>
            </div>
        </div>
    );
}
