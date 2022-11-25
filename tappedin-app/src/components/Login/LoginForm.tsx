import React from "react";
import { useState } from "react";
import axios from "axios";
import FormError from "./FormError";
import { FirebaseAuthenticationService } from "../../sdk/services/firebaseAuthenticationService";
import { FirebaseError } from "firebase/app";

import {
    leftContainer,
    contentBox,
    imageContainer
} from "./LoginForm.module.scss";

import FeatherIcon from "feather-icons-react";
import SideInformation from "../SideInformation/SideInformation";

const authService = new FirebaseAuthenticationService();

export default function LoginForm () 
{

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const verifyForm = (): Object[] => 
    {
        const foundErrors = [];
        // check all are filled
        if (!username || !password) 
        {
            console.log("Missing at least one field.");
            foundErrors.push({
                type: "missing",
                msg: "Missing at least one field" });
        }
        return foundErrors;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
    {
        e.preventDefault();
        // clear previous errors
        setErrors([]);
        const newErrors = verifyForm();
        console.log(newErrors);
        // if no errors then send new user to back end
        if (newErrors.length > 0) 
        {
            setErrors(newErrors);
            return ;
        }
        else 
        {
            try
            {
                await authService.signIn(username, password);

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userID", authService.getCurrentUserId());
                window.open("/Dashboard", "_self");
            }
            catch (err)
            {
                if (err instanceof FirebaseError && err.code == "auth/wrong-password") 
                {
                    newErrors.push({
                        type: "register",
                        msg: "Password is incorrect.",
                    });
                    setErrors(newErrors);
                }
                else if (err instanceof FirebaseError && err.code == "auth/user-not-found")
                {
                    newErrors.push({
                        type: "register",
                        msg: "Email does not exist.",
                    });
                    setErrors(newErrors);
                }
                else if (err instanceof FirebaseError && err.code == "auth/invalid-email")
                {
                    newErrors.push({
                        type: "register",
                        msg: "Invalid email format.",
                    });
                    setErrors(newErrors);
                }
                else
                    console.error(err);
            }
        }
    };

    // style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'space-around'}}
    return (
        <div className='py-4 px-8'>
            <div className="grid md:grid-cols-10">
                <SideInformation></SideInformation>
                <div className="col-span-6 md:ml-20 py-6 md:py-0 flex items-center">
                    <div className="flex-grow">
                        <div>
                            <div className="mb-12">
                                <h1 className="font-semibold">Sign In</h1>
                                <p>Don't have an account with us? <a href="/Register"><span className="font-semibold">Sign Up</span></a></p>
                            </div>
                            <div className="flex mb-4">
                                <FeatherIcon icon="user" color="#639FAB"></FeatherIcon>
                                <p className="font-semibold pl-4">Login</p>
                            </div>
                            <label htmlFor="username" className='block mb-2'>Email</label>
                            <input type="text" name="username" id="username" placeholder='example@email.com' value={username} className='px-4 border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                                onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password" className='block my-2'>Password</label>
                            <input type="password" name="password" id="password" placeholder='Password' value={password} className='px-4 border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                                onChange={(e) => setPassword(e.target.value)}/>
                            <div>
                                <>
                                    {errors.length === 0 ? "": errors.map((error) => 
                                        <FormError key={error.type} error={error.msg}/>)}
                                </>
                            </div>
                            <div className="grid grid-cols-3 mt-8">
                                <button type="submit" className='button' 
                                    onClick={(e) => handleSubmit(e)}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}