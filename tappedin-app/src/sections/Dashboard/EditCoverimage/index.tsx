import React from 'react';
import { useState } from 'react';
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { input, fileUpload, uploadBox } from "./EditCover.module.scss";

export default function EditCover () {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const ACCEPTED_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
    const ACCEPTED_SIZE = 5000000;

    const _getFile = (src: File): Promise<string | ArrayBuffer> => {
        return new Promise ((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileDataURL = reader.result.toString();
                resolve(fileDataURL);
            }
            reader.readAsDataURL(src);
        });
    }

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
        _getFile(newFile).then(res =>{
            console.log(res);
            setFile({
                fileType: newFile.type,
                fileDataURL: res,
                fileName: newFile.name
            });
        });
        
        
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(file);
        
        // let config = {
        //     method: "post",
        //     url: "http://localhost:3001/userFieldServices?field=1&idtype=1&id=testUser",
        //     headers: { 
        //         "Content-Type": "application/json"
        //     },
        //     data : file
        // };

        // axios(config)
        // .then((res) => {
        //     console.log(JSON.stringify(res.data));
        // })
        // .catch((err) => {
        //     console.log(err);  
        // })
    }



    return (
        <div>
            <div className={`${uploadBox} text-center flex flex-col place-content-center`}>
                <label htmlFor="cover" className={`${fileUpload} text-xl`}>
                    <FeatherIcon icon='image' className='inline' size={50}></FeatherIcon>
                    {file ? `${file.fileName}` : "Upload Image"}
                </label>
                <input type="file" name="cover" id="cover" accept=".jpg,.png,.jpeg" onChange={(e) => handleChange(e)} className={`${input}`}/>
                {error && <div> Wrong File Type/Too large (.jpg, .png only, less than 5MB) </div>}
            </div>
            <button type="submit" className='button large mt-2' onClick={(e) => handleSubmit(e)}>Update</button>
                {/* {file && <img src={`${file.fileDataURL}`}></img>} */}
        </div>
    ) ;
}