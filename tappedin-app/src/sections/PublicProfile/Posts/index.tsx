import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../../components/Post";

export default function Posts({ userId }) 
{
    const baseURL = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
    const [ posts, setPosts ] = useState([]);

    useEffect(() => 
    {
        fetchPosts();
    }, []);

    async function fetchPosts() 
    {
        // TODO: the userId of friends should be in this array
        const friends = [ userId ];
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
            <h2 className="font-bold is-text-gradient-1 mb-4">Posts</h2>
            <div className="grid md:grid-cols-2 gap-4">
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
                        <h3>Nothing to Show</h3>
                    )
                }
            </div>
        </div>
    );
}
