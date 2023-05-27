import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from './actions';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    if(!user || !user.accessToken){
        navigate('/signup');
        return null;
    }

    const handelLogOut = () => {
        localStorage.removeItem('user');
        dispatch(clearUser());
        navigate('/signup');
    };

    return (
        <div className='profile-container'>
            <h1>Profile</h1>
            {user && (
                <div>
                    <p>Full Name : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <p>Password : {user.password}</p>
                </div>
            )}
            <button onClick={handelLogOut}>Logout</button>
        </div>
    );
};

export default Profile;