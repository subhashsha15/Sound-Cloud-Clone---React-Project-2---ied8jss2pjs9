import React, { useState } from 'react';
import './EnteruserName.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
const EnterUserName = (props) => {
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const navigate=useNavigate();
    const headers = {
        'projectId': 'ied8jss2pjs9',
    };
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const data={
        name: userName,
        email: email,
        password: password,
        appType: 'music',
    }
    const handleSignIn=()=>{
        axios.post('https://academics.newtonschool.co/api/v1/user/signup',data,{ headers })
        .then((response) => {
            console.log("sign-response",response);
            // props.setSignIn({
            //     DisplayEmailPage: false,
            //     DisplayEnterPasswordPage: true,
            //     DisplayForgotPasswordPage: false,
            //     DisplayEnterUserNamePage: false,
            // })
            navigate('/home');
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
    return (
        <>
            <div className="username-container">
                <h1>Create your SoundCloud account</h1>
                <div className="user-name">
                    <label htmlFor="username">Choose your display name</label>
                    <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <p>Your display name can be anything you like. Your name or artist name are good choices.</p>
                <div className="user-age">
                    <label htmlFor="age">Enter your age</label>
                    <input type="number" id="age" value={userAge} onChange={(e) => setUserAge(e.target.value)} />
                </div>
                <div className="user-gender">
                    <label htmlFor="gender">Enter your gender</label>
                    <select name="gender" id="gender" value={userGender} onChange={(e) => setUserGender(e.target.value)}>
                        <option></option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Custom">Custom</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <button className='continue-button btn' onClick={handleSignIn}>Continue</button>
                <p>By signing up I accept the <span>Terms of Use</span>. I have read and understood the <span>Privacy Policy</span> and <span>Cookies Policy</span>.</p>
            </div>
        </>
    )
}
export default EnterUserName;