import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../../components/Post";

export default function Posts() 
{
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
    const [ friends, setFriends ] = useState([]);
    const [ posts, setPosts ] = useState([]);
    const currentId =
    typeof localStorage !== "undefined"
        ? localStorage.getItem("userID")
        : null;

    useEffect(() => 
    {
        fetchFriends();
    }, []);

    useEffect(() => 
    {
        fetchPosts();
    }, [ friends ]);

    async function fetchFriends(): Promise<void>
    {        
        const config = {
            method: "get",
            url: baseURL + "/friendService/getFriends?id=" + currentId,
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
                        if (key === "authID" || key === "friendAuthID")
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

    async function fetchPosts() 
    {
        const posts = [];

        for (const friend of friends) 
        {
            const config = {
                method: "get",
                url: `${baseURL}/postService/getPost?id=${friend}`,
            };

            try 
            {
                const t = await axios(config);
                posts.push(...t.data);
            }
            catch (e) 
            {
                console.error(e);
            }
        }

        for (const post of posts) 
        {
            post.name = await fetchFullName(post.authID);
        }

        setPosts(posts);
    }

    async function fetchFullName(userID: string): Promise<string> 
    {
        const config = {
            method: "get",
            url:
                baseURL +
                "/userFieldServices?" +
                "field=7&idtype=3&id=" +
                userID,
            headers: {},
            validateStatus: (status) => 
            {
                return status < 500;
            },
        };

        try 
        {
            const t = await axios(config);

            if (t.status == 400 || t.status == 404) return "";
            else 
            {
                return `${t.data[0].firstName} ${t.data[0].lastName}`;
            }
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div className="mt-4">
            {
                // "b.timestamp - a.timestamp" sorts by the latest timestamps
                posts && posts.length != 0 ? (
                    posts
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((post, key) => 
                        {
                            return (
                                <div className="mb-8" key={key}>
                                    <Post post={post}></Post>
                                </div>
                            );
                        })
                ) : (
                    <div>
                        <h3 className="font-semibold">
                            To add a new{" "}
                            <span className="is-text-gradient-1">Post</span> use
                            the + icon
                        </h3>
                    </div>
                )
            }
        </div>
    );
}
