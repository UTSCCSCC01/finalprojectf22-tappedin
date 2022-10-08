import React from 'react';
import { useState } from 'react';
import axios from "axios";
import FormError from "./FormError";

export default function LoginForm () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const verifyForm = (): Object[] => {
        const foundErrors = [];
        // check all are filled
        if (!username || !password) {
            console.log("Missing at least one field.");
            foundErrors.push({
                type: "missing",
                msg: "Missing at least one field"});
        }
        return foundErrors;
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // clear previous errors
        setErrors([]);
        const newErrors = verifyForm();
        console.log(newErrors);
        // if no errors then send new user to back end
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return ;
        } else {
            const usr = {
                LoginInfo: {
                    username: username,
                    password: password
                }
            };
            console.log(usr);
            axios.post('http://localhost:5000/login', usr)
            .then((res) => {
                console.log(res.data);
                //redirect
                console.log(`Login ${username}.`);
                return ;
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    newErrors.push({
                        type: "login",
                        msg: err.response.data
                    });
                    setErrors(newErrors);
                    return ;
                } else if (err.request) {
                    console.log(err.request);
                    newErrors.push({
                        type: "login",
                        msg: "No response."
                    });
                    setErrors(newErrors);
                    return ;
                } else {
                    console.log(err);
                    return ;
                }
            });
        }
    }

    // style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'space-around'}}
    return (
        <div className='container mt-4 p-2'>
            <h1 className='text-[30px] font-bold'>Login</h1>
            <div className='my-2'>If you don't have an account: Sign Up</div>
            <div className='flex flex-col content-evenly'>
                <div className='grid grid-cols-2 justify-center my-2 w-full'>
                </div>
                <div>
                    <label htmlFor="username" className='block mb-1'>Username</label>
                    <input type="text" name="username" id="username" placeholder='Username' value={username} className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" className='block my-1'>Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' value={password} className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <>
                    {errors.length === 0 ? '': errors.map((error) => 
                    <FormError key={error.type} error={error.msg}/>)}
                    </>
                </div>
                <div>
                    <button type="submit" className='p-1 rounded-md hover:ring bg-red-500 text-white text-center w-1/3' 
                    onClick={(e) => handleSubmit(e)}>Login</button>
                </div>
            </div>
        </div>
    );
}