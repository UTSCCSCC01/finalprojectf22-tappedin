import {
    customBackground,
    editContainer,
} from "./CommentSection.module.scss";

import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../../sections/CommentSection/Comments";

export default function CommentSectionPage() 
{
    const [ description, setDescription ] = useState("");

    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;

    const userId =
        typeof localStorage !== "undefined"
            ? localStorage.getItem("userID")
            : null;

    const postID =
        typeof localStorage !== "undefined"
            ? localStorage.getItem("postID")
            : null;


    async function handleSubmit(): Promise<void> 
    {
        const data = {
            userID: userId,
            content: description,
            dateCreated: new Date().toLocaleDateString(),
            timestamp: Date.now(),
        };

        const config = {
            method: "post",
            url: `${baseURL}/postService/addComment`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        try 
        {
            const response = await axios(config);
            // Update post info with new commentIDs

            const data2 = {
                commentID: response.data,
            };

            const config2 = {
                method: "put",
                url: `${baseURL}/postService/addCommentID?objectid=${postID}`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data2,
            };

            axios(config2)
                .then(function (response)
                {
                    console.log(response.data);
                })
                .catch(function (e) 
                {
                    console.log(e);
                });
            window.open("/CommentSection", "_self");
            
        }
        catch (e) 
        {
            console.error(e);
        }
    }



    return (
        <div className={`${customBackground}`}>
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
                    <div className="grid gap-8 mb-6 mt-2">
                        <div>
                            <div className="mb-2">
                                <h1 className="font-bold">Comments</h1>
                            </div>
                            <Comments></Comments>
                            <textarea
                                placeholder="Comment"
                                cols={30}
                                rows={10}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4">
                        <button
                            className="button"
                            onClick={() => handleSubmit()}
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
                <div className="p-4"></div>
            </div>
        </div>
    );
}