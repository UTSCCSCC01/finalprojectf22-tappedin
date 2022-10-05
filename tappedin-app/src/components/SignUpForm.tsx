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
    const [errors, setErrors] = useState({});

    const verifyForm = () => {
        // check all are filled
        // check email format
        // check password length
        // check password == confirm password
        if (password !== confirmPassword){
            console.log("Passwords don't match.");
        }
        return;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        verifyForm();
        console.log(errors);
        console.log(firstName, lastName, username, email, password, type);
    }


    return (
        <div>
            <h1>Sign Up</h1>
            <div>If you already have an account: Login</div>
            <div>Personal Information:</div>
            <div style={{display: 'flex', flexDirection: 'column',justifyContent:'left'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div style={{display: 'block'}}>
                        <label htmlFor="firstName" style={{display: 'block'}}>First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/> 
                    </div>
                    <div style={{display: 'block'}}>
                        <label htmlFor="lastName" style={{display: 'block'}}>Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="username" style={{display: 'block'}}>Username</label>
                    <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email" style={{display: 'block'}}>Email</label>
                    <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" style={{display: 'block'}}>Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword" style={{display: 'block'}}>Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="type" style={{display: 'block'}}>Choose Account Type:</label>
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