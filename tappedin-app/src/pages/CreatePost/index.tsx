import {
    customBackground,
    editContainer,
    previewContainer,
    previewImage,
    previewContent,
} from "./CreatePost.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreatePost() 
{
    const [ title, setTitle ] = useState("");
    const [ imageUrl, setImageUrl ] = useState("");
    const [ description, setDescription ] = useState("");

    const [ signedInUserFullName, setSignedInFullUserName ] = useState("");

    const baseURL =
            process.env.NEXT_PUBLIC_SERVER_ADDRESS;

    const userId =
            typeof localStorage !== "undefined"
                ? localStorage.getItem("userID")
                : null;

    useEffect(() => 
    {
        fetchSignedInUserFullName();
    }, []);

    async function fetchSignedInUserFullName(): Promise<void> 
    {
        if (!userId) return;

        const config = {
            method: "get",
            url: `${baseURL}/userFieldServices?field=7&idtype=3&id=${userId}`,
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404) return;
            else 
            {
                setSignedInFullUserName(
                    `${t.data[0].firstName} ${t.data[0].lastName}`
                );
            }
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    async function handleSubmit(): Promise<void>
    {
        const data = {
            userID: userId,
            imageURL: imageUrl,
            commentIDs: [],
            likeIDs: [],
            title: title,
            content: description,
            dateCreated: new Date().toLocaleDateString(),
            timestamp: Date.now()
        };

        const config = {
            method: "post",
            url: `${baseURL}/postService/addPost`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        try 
        {
            const t = await axios(config);

            console.log(t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className={`${customBackground}`}>
            <CoverImage></CoverImage>
            <div className="container mx-auto">
                <div className={`${editContainer}`}>
                    <a href="/Dashboard">
                        <div className="flex items-center">
                            <FeatherIcon
                                icon="chevron-left"
                                stroke="#BBCDE5"
                            ></FeatherIcon>
                            <label className="is-lightblue cursor-pointer">
                                Back
                            </label>
                        </div>
                    </a>
                    <h1 className="font-bold mb-10">
                        New <span className="is-text-gradient-1">Post</span>
                    </h1>
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Title</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Title"
                                className="mb-4"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className="mb-2">
                                <label>Image</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Image"
                                className="mb-4"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <div className="mb-2">
                                <label>Description</label>
                            </div>
                            <textarea
                                placeholder="Description"
                                cols={30}
                                rows={10}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2">
                                <label>Preview</label>
                            </div>
                            <div className={`${previewContainer}`}>
                                <div
                                    className={`${previewImage}`}
                                    style={
                                        imageUrl
                                            ? {
                                                backgroundImage: `url(${imageUrl})`,
                                            }
                                            : {
                                                background:
                                                      "linear-gradient(179.81deg, #BBCDE5 0.16%, rgba(187, 205, 229, 0) 94.83%)",
                                            }
                                    }
                                ></div>
                                <div className={`${previewContent}`}>
                                    <h3 className="is-text-gradient-1 font-bold">
                                        {title}
                                    </h3>
                                    <p className="text-sm mb-4 font-semibold">{signedInUserFullName}</p>
                                    <p className="pre-wrap mb-4">{description}</p>
                                    <div className="">
                                        <p className="text-sm">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4">
                        <button className="button" onClick={() => handleSubmit()}>Create Post</button>
                    </div>
                </div>
                <div className="p-4"></div>
            </div>
        </div>
    );
}
