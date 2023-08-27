import React, { useState } from "react";
import './EnterPassword.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useNavigate } from "react-router";
const EnterPassword = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const email = localStorage.getItem('email');
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
    }
    return (
        <>
            <div className="enterpassword-container">
                <div className="enterpassword-container-top">
                    Welcome back!
                </div>
                <div className="enterpassword-container-middle">
                    <div className="email-box" title="Go back one step"
                        onClick={() => props.setSignIn({
                            DisplayEmailPage: true,
                            DisplayEnterPasswordPage: false,
                            DisplayForgotPasswordPage: false,
                        })}>
                        <ArrowLeftIcon className="leftarrow" />
                        <input type="text" className="btn" placeholder="Your email address or profile URL" value={email} />
                    </div>
                    <div className="password-box">
                        <input type={passwordVisible ? "text" : "password"} className="btn" placeholder="Your password"
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
                    <button className="continue-button btn"
                        onClick={handleSignIn}
                    >Sign in</button>
                </div>
                <div className="enterpassword-container-bottom"
                    onClick={() => props.setSignIn({
                        DisplayEmailPage: false,
                        DisplayEnterPasswordPage: false,
                        DisplayForgotPasswordPage: true,
                    })}
                >
                    Don’t know your password?
                </div>
            </div>
        </>
    )
}

export default EnterPassword;