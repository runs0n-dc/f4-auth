import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './actions';

const Signup = () => {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = () => {
        if(username && email && password && confirmPassword){
            if(password === confirmPassword){
                const accessToken = generateAccessToken();
                const user = {
                    fullName : username,
                    email : email,
                    password : password,
                    accessToken : accessToken,
                };
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(setUser(user));
                setSuccessMsg('Successfully Signed Up!');
                setErrorMsg('');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            }
            else{
                setSuccessMsg('');
                setErrorMsg('Passwords do not match.');
            }
        }
        else{
            setSuccessMsg('');
            setErrorMsg('Error : All the fields are mandatory');
        }
    };

    const generateAccessToken = () => {
        return [...Array(16)].map(() => Math.floor(Math.random() *16).toString(16)).join('');
    }

    return (
        <div className='sign-container'>
            <h1>Signup</h1>
            <input type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <input type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
            {successMsg && <p style={{color: 'green'}}>{successMsg}</p>}
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
        </div>
    );
};

export default Signup;