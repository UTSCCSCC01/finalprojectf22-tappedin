import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import React from "react";
import { useState } from "react";
import { FirebaseAuthenticationService } from "../../sdk/services/firebaseAuthenticationService";
import FormError from "./FormError";

const authService = new FirebaseAuthenticationService();

import FeatherIcon from "feather-icons-react";

export default function SignUpForm() 
{
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ type, setType ] = useState("business");
    const [ errors, setErrors ] = useState([]);

    const verifyForm = (): Object[] => 
    {
        const foundErrors = [];
        // check all are filled
        if (
            !firstName ||
            !lastName ||
            !username ||
            !password ||
            !confirmPassword ||
            !type
        ) 
        {
            console.log("Missing at least one field.");
            foundErrors.push({
                type: "missing",
                msg: "Missing at least one field",
            });
        }
        // check password length
        if (password.length < 6) 
        {
            console.log("Password is not long enough.");
            foundErrors.push({
                type: "password",
                msg: "Password is not long enough.",
            });
        }
        // check password == confirm password
        if (password !== confirmPassword)
        {
            console.log("Passwords don't match.");
            foundErrors.push({
                type: "confirmPass",
                msg: "Passwords don't match.",
            });
        }
        return foundErrors;
    };

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => 
    {
        e.preventDefault();
        // clear previous errors
        setErrors([]);
        const newErrors = verifyForm();
        // if no errors then send new user to back end
        if (newErrors.length > 0) 
        {
            setErrors(newErrors);
            return;
        }
        else 
        {
            try 
            {
                await authService.signUp(
                    email,
                    username,
                    password,
                    firstName,
                    lastName,
                    type == "business"
                );

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userID", authService.getCurrentUserId());
                window.open("/Dashboard", "_self");
            }
            catch (err) 
            {
                console.log(typeof err);
                console.log(err);
                if (
                    err instanceof FirebaseError &&
                    err.code == "auth/email-already-in-use"
                ) 
                {
                    newErrors.push({
                        type: "register",
                        msg: "There is already an account associated with that email address.",
                    });
                    setErrors(newErrors);
                }
                else if (err.isAxiosError) 
                {
                    //(err.message.includes("Username") && err.message.includes("already exists"))
                    if (
                        err.response.data.includes("Username") &&
                        err.response.data.includes("already exists")
                    ) 
                    {
                        newErrors.push({
                            type: "register",
                            msg: "There is already an account associated with that username.",
                        });
                        setErrors(newErrors);
                    }
                    else if (
                        err.response.data.includes("Email") &&
                        err.response.data.includes("already exists")
                    ) 
                    {
                        newErrors.push({
                            type: "register",
                            msg: "There is already an account associated with that email address.",
                        });
                        setErrors(newErrors);
                    }
                }
            }
        }
    };

    // style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'space-around'}}
    return (
        <div className="container mt-4 p-2">
            <h1 className="text-[30px] font-semibold mb-4">Sign Up</h1>
            <p>Have an account with us? <a href="/Login"><span className="font-semibold">Sign In</span></a></p>
            <div className="flex mt-8 mb-4">
                <FeatherIcon icon="user" color="#639FAB"></FeatherIcon>
                <p className="font-semibold ml-2">Personal Information</p>
            </div>
            <div className="flex flex-col content-evenly">
                <div className="grid grid-cols-2 justify-center my-2 w-full">
                    <div className="mr-3">
                        <label htmlFor="firstName" className="block">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            className="border-2 border-blue-200 rounded-lg p-4 w-full hover:ring"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            className="border-2 border-blue-200 rounded-lg p-4 w-full hover:ring"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="username" className="block mt-2">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        className="border-2 border-blue-200 rounded-lg p-4 w-full hover:ring"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mt-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        className="border-2 border-blue-200 rounded-lg p-4 w-full hover:ring"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mt-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        className="border-2 border-blue-200 rounded-lg p-4 w-full hover:ring"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mt-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className="border-2 border-blue-200 rounded-lg p-4 w-full hover:ring"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <>
                        {errors.length === 0
                            ? ""
                            : errors.map((error) => (
                                <FormError
                                    key={error.type}
                                    error={error.msg}
                                />
                            ))}
                    </>
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3">
                    <button className="button" onClick={(e) => handleSubmit(e)}>Create Account</button>
                </div>
            </div>
        </div>
    );
}
