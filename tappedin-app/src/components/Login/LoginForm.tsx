import React from "react";
import { useState } from "react";
import axios from "axios";
import FormError from "./FormError";
import { FirebaseAuthenticationService } from "../../sdk/services/firebaseAuthenticationService";
import { FirebaseError } from "firebase/app";

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
            }
            catch (err)
            {
                console.log(err);
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
            }
            finally
            {
                localStorage.setItem("isLoggedIn", "true");
                window.open("/Dashboard", "_self");
            }
        }
    };

    // style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'space-around'}}
    return (
        <div className='container mt-4 p-2'>
            <h1 className='text-[30px] font-bold'>Login</h1>
            <div className='my-2'>If you don't have an account: Sign Up</div>
            <div className='flex flex-col content-evenly'>
                <div className='grid grid-cols-2 justify-center my-2 w-full'>
                </div>
                <div>
                    <label htmlFor="username" className='block mb-1'>Email</label>
                    <input type="text" name="username" id="username" placeholder='example@email.com' value={username} className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" className='block my-1'>Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' value={password} className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <>
                        {errors.length === 0 ? "": errors.map((error) => 
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