import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { input, fileUpload, uploadBox } from "./EditCover.module.scss";

export default function EditCover ({ imgData: imgData }) {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const ACCEPTED_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
    const ACCEPTED_SIZE = 5000000;


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let newFile = e.target.files[0];
        if (!ACCEPTED_TYPES.includes(newFile.type))
        {
            setError(true);
            e.target.value = null;
            return ;
        }
        if (newFile.size > ACCEPTED_SIZE)
        {
            setError(true);
            e.target.value = null;
            return ;
        }
        setError(false);
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result.toString());
            setFile({
                imageType: newFile.type,
                imageDataURL: reader.result.toString(),
                imageName: newFile.name
            });
        }
        reader.readAsDataURL(newFile);
        
        
    }

    const updateCoverImage = (uid: string): void =>
    {
        const data = JSON.stringify(file);
        console.log(uid);

        const config = {
            method: "put",
            // Change me
            url: `http://localhost:3001/userFieldServices?field=2&objectid=${uid}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        // axios(config)
        //     .then((response) =>
        //     {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch((error) =>
        //     {
        //         console.log(error);
        //     });
    }

    const createCoverImage = (): void => {
        const data = JSON.stringify(file);

        const config = {
            method: "post",
            // change me
            url: "http://localhost:3001/userFieldServices?field=2&idtype=1&id=testUser",
            headers: { 
                "Content-Type": "application/json"
            },
            data : data
        };

        axios(config)
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log(err);  
        })
    }


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(file);
        console.log(imgData.imageName);

        if (imgData) 
        {
            // There exists a cover image -> update
            console.log("updating cover image");
            const uid = new URLSearchParams(window.location.search).get("id");
            updateCoverImage(uid);
        } 
        else 
        {
            console.log("no cover image, setting new one");
            createCoverImage();
        }
        //window.open('/Dashboard', '_self')
        
    }



    return (
        <div className='pb-2'>
            <label >Cover Image</label>
            <div className={`${uploadBox} text-center flex flex-col place-content-center`}>
                <label htmlFor="cover" className={`${fileUpload} text-xl`}>
                    <FeatherIcon icon='image' className='inline' size={50}></FeatherIcon>
                    {file ? `${file.imageName}` : "Upload Image"}
                </label>
                <input type="file" name="cover" id="cover" accept=".jpg,.png,.jpeg" onChange={(e) => handleChange(e)} className={`${input}`}/>
                {error && <div> Wrong File Type/Too large (.jpg, .png only, less than 5MB) </div>}
            </div>
            <button type="submit" className='button mt-2' onClick={(e) => handleSubmit(e)}>Update</button>
                {file && <img src={`${file.imageDataURL}`}></img>}
        </div>
    ) ;
}