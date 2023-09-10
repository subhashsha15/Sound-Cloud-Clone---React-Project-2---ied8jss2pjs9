import React, { useState } from "react";
import './EnterPassword.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useNavigate } from "react-router";
import axios from "axios";
import { headers } from '../../../miscellaneous/miscellaneous'
const EnterPassword = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const email = localStorage.getItem('email');
    localStorage.setItem('password', password);
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    const handlePasswordOnChange = (event) => {
        setPasswordError("");
        setPassword(event.target.value);
    }

    const handleSignIn = () => {
        if (password == "") {
            setPasswordError("Password required")
            return;
        }

        const data = {
            email: email,
            password: password,
            appType: 'music',
        }
        setLoading(true);
        axios.post('https://academics.newtonschool.co/api/v1/user/login', data, { headers })
            .then((response) => {
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem('UserName', response.data.data.name);
                setLoading(false);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    const handleAcceptAndContinue = () => {
        props.setSignIn({
            DisplayEmailPage: false,
            DisplayEnterPasswordPage: false,
            DisplayForgotPasswordPage: false,
            DisplayEnterUserNamePage: true,
        })
    }
    return (
        <>
            <div className="enterpassword-container">
                <div className="enterpassword-container-top">
                    {
                        user == "newUser" ? "Create your SoundCloud account" : "Welcome back!"
                    }
                </div>
                {
                    user == "oldUser" && (<div>We noticed that an account already exists for this email.Please sign in below</div>)
                }
                <div className="enterpassword-container-middle">
                    <div className="email-box" title="Go back one step"
                        onClick={() => props.setSignIn({
                            DisplayEmailPage: true,
                            DisplayEnterPasswordPage: false,
                            DisplayForgotPasswordPage: false,
                            DisplayEnterUserNamePage: false,
                        })}>
                        <ArrowLeftIcon className="leftarrow" />
                        <input type="text" className="btn" placeholder="Your email address or profile URL" value={email} />
                    </div>
                    {user == "newUser" && <label htmlFor="password" className="password-label">Choose a password</label>}
                    <div className="password-box">
                        <input type={passwordVisible ? "text" : "password"} id="password" className="btn" placeholder="Your password"
                            onChange={handlePasswordOnChange}
                            value={password}
                        />
                        <div className="password-icons" onClick={() => setPasswordVisible((prevstate) => !prevstate)}>
                            {
                                passwordVisible ? <VisibilityOffIcon className="visiblity-icon" /> : <VisibilityIcon className="visiblity-icon" />
                            }
                        </div>
                        {passwordError && (<div className="error">{passwordError}</div>)}
                    </div>
                    {
                        user == "oldUser" ?
                            <button className="continue-button btn" onClick={handleSignIn}>{loading ? "Signing..." : "Sign in"}</button> :
                            <button className="continue-button btn" onClick={handleAcceptAndContinue}>Accept & continue</button>
                    }
                </div>
                {
                    user == "oldUser" ? (<div className="enterpassword-container-bottom"
                        onClick={() => props.setSignIn({
                            DisplayEmailPage: false,
                            DisplayEnterPasswordPage: false,
                            DisplayForgotPasswordPage: true,
                        })}
                    >
                        Update your password?
                    </div>) :
                        (
                            <>
                                <div className="signup-container-bottom">
                                    <span>Need help?</span>
                                    <br />
                                    When registering, you agree that we may use your provided data for the registration and
                                    to send you notifications on our products and services.
                                    You can unsubscribe from notifications at any time in your settings.
                                    For additional info please refer to our <span>Privacy Policy</span>.
                                </div>
                            </>
                        )
                }

            </div>
        </>
    )
}

export default EnterPassword;