import React from "react";

export default function FormError ( { error } )
{
    return (
        <div className="border-2 border-red-400 bg-red-200 p-1 my-2 rounded-md">
            <p>{error}</p>
        </div>
    );
}