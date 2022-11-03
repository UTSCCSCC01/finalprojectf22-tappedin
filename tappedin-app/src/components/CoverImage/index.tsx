import axios from "axios";
import { useEffect, useState } from "react";
import { customBanner,
    isLarge } from "./CoverImage.module.scss";

interface CoverImageProps {
    size?: string;
}

export default function CoverImage({ size = "sm" }: CoverImageProps)
{
    const [ coverImageData, setCoverImageData ] = useState();

    useEffect(() => 
    {
        fetchCoverImage();
    }, []);

    async function fetchCoverImage(): Promise<void> 
    {
        const config = {
            method: "get",
            // FIXME: Change URL
            url: "http://localhost:3001/userFieldServices?field=6&idtype=1&id=testUser",
            headers: {},
        };

        try 
        {
            const t = await axios(config);

            // FIXME: Backend Fix and Remove
            if (t.data == "Nothing was found for this query.")
                setCoverImageData(null);
            else setCoverImageData(t.data[0]);
            // setCoverImageData(null);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    return (
        <div>
            <div
                className={`${customBanner} mb-10 ${size == "lg" ? isLarge : "" } relative`}
                style={
                    coverImageData && coverImageData.imageUrl != ""
                        ? { backgroundImage: `url(${coverImageData.imageUrl})` }
                        : {
                            background:
                                  "linear-gradient(271.61deg, #639FAB -16.87%, rgba(99, 159, 171, 0.34) 109.57%);",
                        }
                }
            >
                <h1 className="absolute bottom-3 right-4 font-bold text-white text-6xl">
                    Tapped
                    <span style={{ color: "#639FAB" }}>
                        In.
                    </span>
                </h1>
            </div>
        </div>
    );
}
