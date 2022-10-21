import { customBanner, coverImage, image } from "./CoverImage.module.scss";

export default function CoverImage({ imgData: imgData })
{

    return (
        <div>
            {
                imgData ? 
                <div className={`${coverImage}`}>
                    <img src={`${imgData.imageDataURL}`} className={`${image}`} alt={`${imgData.imageName}`}></img>
                </div>
                :
                <div className={`${customBanner} mb-10`}></div>
            }
            
        </div>
    );
}