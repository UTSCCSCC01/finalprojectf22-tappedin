import React from 'react';
import { useState } from 'react';

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({});

    const verifyForm = () => {
        // check all are filled
        // check password length

        return;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        verifyForm();
        console.log(errors);
        console.log(username, password, type);
    }

    return (
        <div>
            <h1>Login</h1>
            <div style={{display: 'flex', flexDirection: 'column',justifyContent:'left'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                </div>
                <div>
                    <label htmlFor="username" style={{display: 'block'}}>Username</label>
                    <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" style={{display: 'block'}}>Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
                </div>
            </div>
        </div>
    );
}
