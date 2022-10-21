import { customBanner, coverImage } from "./CoverImage.module.scss";

export default function CoverImage({ imgDataURL }: {imgDataURL: string})
{

    return (
        <div>
            {
                imgDataURL.length > 0 ? 
                <img src={`${imgDataURL}`} className={`${coverImage}`}></img>:
                <div className={`${customBanner} mb-10`}></div>
            }
            
        </div>
    );
}