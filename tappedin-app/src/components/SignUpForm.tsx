import React from 'react';
import { useState } from 'react';

export default function SignUpForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState([]);

    const verifyForm = () => {
        const foundErrors = [];
        // check all are filled
        if (!firstName || !lastName || !username || !password || !confirmPassword || !type) {
            console.log("Missing at least one field.");
            foundErrors.push("Missing at least one field.");
        }
        // check password length
        if (password.length < 6) {
            console.log("Password is not long enough.");
            foundErrors.push("Password is not long enough.");
        }
        // check password == confirm password
        if (password !== confirmPassword){
            console.log("Passwords don't match.");
            foundErrors.push("Passwords don't match.");
        }
        return foundErrors;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newErrors = verifyForm();
        console.log(newErrors);
        // if no errors then send new user to back end
        if (newErrors.length === 0) {
            const usr = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                date: new Date(Date.now())
            };
            console.log(usr);
        } else {
            setErrors(newErrors);
            return ;
        }

    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
            <h1>Sign Up</h1>
            <div>If you already have an account: Login</div>
            <div>Personal Information:</div>
            <div>
                <div>
                    <div>
                        <label htmlFor="firstName" >First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/> 
                    </div>
                    <div>
                        <label htmlFor="lastName" >Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="username" >Username</label>
                    <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword" >Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="type" >Choose Account Type:</label>
                    <div>
                        <input type="radio" name="type" id="business" value="business" onChange={(e) => setType(e.target.value)}/> Business
                        <input type="radio" name="type" id="social" value="social" onChange={(e) => setType(e.target.value)}/>Social
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Create Account</button>
                </div>
            </div>
        </div>
    );
}