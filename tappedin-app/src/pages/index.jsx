// index.html
import { useState } from "react";

function Header({ title }) 
{
    return <h1>{title ? title : "Default title"}</h1>;
}

export default function HomePage() 
{
    const names = [ "Ada Lovelace", "Grace Hopper", "Margaret Hamilton" ];

    const [ likes, setLikes ] = useState(0);

    function handleClick() 
    {
        setLikes(likes + 1);
        fetch("http://localhost:3001/v1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "numLikes": likes })
        });
    }

    return (
        <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>

            <button onClick={handleClick}>Like!! ({likes})</button>
        </div>
    );
}