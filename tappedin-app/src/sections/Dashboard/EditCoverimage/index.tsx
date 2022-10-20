import React from 'react';
import { useState } from 'react';
import axios from "axios";

export default function EditCover () {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const ACCEPTED_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newFile = e.target.files[0];
        if (!ACCEPTED_TYPES.includes(newFile.type))
        {
            setError(true);
            e.target.value = null;
            return ;
        }
        if (newFile.size > 5000000)
        {
            setError(true);
            e.target.value = null;
            return ;
        }
        setError(false);
        setFile(newFile);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(file);
        const newImg = new FormData();
        newImg.append("coverImg", file);
        console.log(newImg.get("coverImg"));

        axios.post('', newImg)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);  
        })
    }



    return (
        <div className='m-2'>
            <label htmlFor="cover">Cover Image</label>
            <div className='border-2 border-[#95D5E2] border-dashed rounded-lg p-2 mt-2 text-center'>
                <input type="file" name="cover" id="cover" onChange={(e) => handleChange(e)} className='w-full p-8 h-full'/>
                {error && <div> File wrong type/too large </div>}
            </div>
            <button type="submit" className='button large mt-2' onClick={(e) => handleSubmit(e)}>Update</button>
        </div>
    ) ;
}