import axios from "axios";
import { getAdditionalUserInfo } from "firebase/auth";
import { useEffect, useState } from "react";
import Comment from "../../../components/Comment";

export default function Comments() 
{
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
    const [ comments, setComments ] = useState([]);

    useEffect(() => 
    {
        fetchComments();
    }, []);

    async function fetchComments() 
    {
        const fetchedComments = [];

        const postID =
            typeof localStorage !== "undefined"
                ? localStorage.getItem("postID")
                : null;

        const config = {
            method: "get",
            url: `${baseURL}/postService/getCommentsFromPost?objectid=${postID}`,
        };

        try 
        {
            const t = await axios(config);
            fetchedComments.push(...t.data);
        }
        catch (e) 
        {
            console.error(e);
        }
        
        setComments(fetchedComments);
    }

    return (
        <div className="mt-4">
            {
                // "a.timestamp - b.timestamp" sort, earliest to latest comments
                comments && comments.length != 0 ? (
                    comments
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((comment, key) => 
                        {
                            return (
                                <div className="mb-8" key={key}>
                                    <Comment comment={comment}></Comment>
                                </div>
                            );
                        })
                ) : (
                    <div>
                    </div>
                )
            }
        </div>
    );
}
