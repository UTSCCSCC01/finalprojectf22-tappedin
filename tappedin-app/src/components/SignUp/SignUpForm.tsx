import React from "react";
import { useState } from "react";
import axios from "axios";
import FormError from "./FormError";

export default function SignUpForm () 
{

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ type, setType ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const verifyForm = (): Object[] => 
    {
        const foundErrors = [];
        // check all are filled
        if (!firstName || !lastName || !username || !password || !confirmPassword || !type) 
        {
            console.log("Missing at least one field.");
            foundErrors.push({
                type: "missing",
                msg: "Missing at least one field" });
        }
        // check password length
        if (password.length < 6) 
        {
            console.log("Password is not long enough.");
            foundErrors.push({
                type: "password",
                msg: "Password is not long enough." });
        }
        // check password == confirm password
        if (password !== confirmPassword)
        {
            console.log("Passwords don't match.");
            foundErrors.push({
                type: "confirmPass",
                msg: "Passwords don't match." });
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
            const usr = {
                UserInfo: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password,
                    dateCreated: new Date(Date.now()).toLocaleString()
                }
            };
            console.log(usr);
            axios.post("http://localhost:3001/createUser", usr)
                .then((res) => 
                {
                    console.log(res.data);
                    //redirect once decided
                    console.log(`Registered ${username}.`);
                    return ;
                })
                .catch((err) => 
                {
                    if (err.response) 
                    {
                        console.log(err.response.data);
                        newErrors.push({
                            type: "register",
                            msg: err.response.data
                        });
                        setErrors(newErrors);
                        return ;
                    }
                    else if (err.request) 
                    {
                        console.log(err.request);
                        newErrors.push({
                            type: "register",
                            msg: "No response."
                        });
                        setErrors(newErrors);
                        return ;
                    }
                    else 
                    {
                        console.log(err);
                        return ;
                    }
                });
        }
    };

    // style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'space-around'}}
    return (
        <div className='container mt-4 p-2'>
            <h1 className='text-[30px] font-bold'>Sign Up</h1>
            <div className='my-2'>If you already have an account: Login</div>
            <div className='mt-6'>Personal Information:</div>
            <div className='flex flex-col content-evenly'>
                <div className='grid grid-cols-2 justify-center my-2 w-full'>
                    <div className='mr-3'>
                        <label htmlFor="firstName" className='block'>First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder='First Name' 
                        className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} /> 
                    </div>
                    <div>
                        <label htmlFor="lastName" className='block'>Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder='Last Name' 
                        className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                            value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="username" className='block mb-1'>Username</label>
                    <input type="text" name="username" id="username" 
                    placeholder='Username' value={username} 
                    className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email" className='block my-1'>Email</label>
                    <input type="email" name="email" id="email" placeholder='Email' value={email} 
                    className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" className='block my-1'>Password</label>
                    <input type="password" name="password" id="password"
                     placeholder='Password' value={password} 
                     className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='block my-1'>Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" 
                        placeholder='Confirm Password' value={confirmPassword} 
                        className='border-2 border-blue-200 rounded-lg p-1 w-full hover:ring'
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className='my-1'>
                    <label htmlFor="type">Choose Account Type:</label>
                    <div className='flex flex-row justify-evenly my-2'>
                        <input type="radio" name="type" id="business" value="business" 
                            onChange={(e) => setType(e.target.value)}/> Business
                        <input type="radio" name="type" id="social" value="social" 
                            onChange={(e) => setType(e.target.value)}/>Social
                    </div>
                </div>
                <div>
                    <>
                        {errors.length === 0 ? "": errors.map((error) => 
                            <FormError key={error.type} error={error.msg}/>)}
                    </>
                </div>
                <div>
                    <button type="submit"
                     className='p-1 rounded-md hover:ring bg-red-500 text-white text-center w-1/3' 
                        onClick={(e) => handleSubmit(e)}>Create Account</button>
                </div>
            </div>
        </div>
    );
}