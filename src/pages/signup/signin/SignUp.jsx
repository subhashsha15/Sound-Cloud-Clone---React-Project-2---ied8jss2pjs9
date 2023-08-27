import React, { useState } from "react"
import './SignUp.css'
import cross from '../../../../public/images/cross-image.svg'
import facebook from '../../../../public/images/facebook.png'
import google from '../../../../public/images/google.svg'
import apple from '../../../../public/images/apple.svg'
import { useNavigate } from "react-router"
import EnterPassword from '../enterpassword/EnterPassword'
import ForgotPassword from '../forgotpassword/ForgotPassword'
import {provider,auth} from '../../../components/firebase/Firebase'
import { signInWithPopup } from "firebase/auth"
const Signup = () => {
    const [signin, setSignIn] = useState({
        DisplayEmailPage: true,
        DisplayEnterPasswordPage: false,
        DisplayForgotPasswordPage: false,
    });
    const { DisplayEmailPage, DisplayEnterPasswordPage, DisplayForgotPasswordPage } = signin;

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailRegistered, setisEmailRegistered] = useState(false);
    const handleEmailOnChange = (event) => {
        setEmail(event.target.value);
        setEmailError("")
    }

    const handleContinue = (event) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "" || !regex.test(email)) {
            setEmailError("Enter a valid email address or profile url.")
            return;
        }
        setSignIn({
            DisplayEmailPage: false,
            DisplayEnterPasswordPage: true,
            DisplayForgotPasswordPage: false,
        })
        localStorage.setItem('email', email);
    }

    const handleSignInWithGoogle=()=>{
        signInWithPopup(auth,provider).then((data)=>{
            console.log(data.user.reloadUserInfo.displayName);
        })
    }
    const navigate = useNavigate();
    return (
        <>
            <div className="signup">
                <div className="signup-container">
                    <img className="close-signupModel" src={cross} alt="cross-img" onClick={() => navigate("/")} />
                    {
                        DisplayEmailPage == true ? (
                            <>
                                <div className="signup-container-top">
                                    <button className="facebook-button">
                                        <img src={facebook} alt="" />
                                        <span>Continue with Facebook</span>
                                    </button>
                                    <button className="google-button" onClick={handleSignInWithGoogle}>
                                        <img src={google} alt="" />
                                        <span>Continue with Google</span>
                                    </button>
                                    <button className="apple-button">
                                        <img src={apple} alt="" />
                                        <span>Continue with Apple</span>
                                    </button>
                                </div>
                                <div className="separator">
                                    <span>or</span>
                                </div>
                                <div className="signup-container-middle">
                                    <input type="text" placeholder="Your email address or profile URL"
                                        onChange={handleEmailOnChange}
                                        value={email}
                                        className={emailError == false ? "error" : ""}
                                    />
                                    {emailError && (<div className="error">{emailError}</div>)}
                                    <button className="continue-button"
                                        onClick={handleContinue}>Continue</button>
                                    <span>Need help?</span>
                                </div>
                                <div className="signup-container-bottom">
                                    When registering, you agree that we may use your provided data for the registration and
                                    to send you notifications on our products and services.
                                    You can unsubscribe from notifications at any time in your settings.
                                    For additional info please refer to our <span>Privacy Policy</span>.
                                </div>
                            </>
                        ) : DisplayEnterPasswordPage == true ? (<EnterPassword setSignIn={setSignIn} />) : (<ForgotPassword setSignIn={setSignIn} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Signup;