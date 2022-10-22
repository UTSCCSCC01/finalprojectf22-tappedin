import { customBanner } from "./CoverImage.module.scss";

export default function CoverImage({ imageURL: imageURL }) 
{
    return (
        <div>
            <div
                className={`${customBanner} mb-10`}
                style={
                    imageURL && imageURL != ""
                        ? { backgroundImage: `url(${imageURL})` }
                        : {
                            background:
                                  "linear-gradient(271.61deg, #639FAB -16.87%, rgba(99, 159, 171, 0.34) 109.57%);",
                        }
                }
            ></div>
        </div>
    );
}
