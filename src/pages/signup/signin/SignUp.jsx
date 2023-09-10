import React, { useEffect, useState } from "react"
import './SignUp.css'
import cross from '../../../../public/images/cross-image.svg'
import google from '../../../../public/images/google.svg'
import { useNavigate } from "react-router"
import EnterPassword from '../enterpassword/EnterPassword'
import ForgotPassword from '../forgotpassword/ForgotPassword'
import { provider, auth } from '../../../components/firebase/Firebase'
import { signInWithPopup } from "firebase/auth"
import EnterUserName from "../enterusername/EnterUserName"
const Signup = () => {
    const [signin, setSignIn] = useState({
        DisplayEmailPage: true,
        DisplayEnterPasswordPage: false,
        DisplayForgotPasswordPage: false,
        DisplayEnterUserNamePage: false,
    });
    const { DisplayEmailPage, DisplayEnterPasswordPage, DisplayForgotPasswordPage } = signin;

    const [email, setEmail] = useState("");
    const [isCloseBtnClicked, setIsCloseBtnClicked] = useState(false);
    const [emailError, setEmailError] = useState("");

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
            DisplayEnterUserNamePage: false,
        })
        localStorage.setItem('email', email);
    }

    const navigate = useNavigate();
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, provider).then((data) => {
            // console.log("google data=",data);
            localStorage.setItem('UserName', data.user.reloadUserInfo.displayName);
            localStorage.setItem('email', data.user.email);
            // localStorage.setItem('Token',data.user.accessToken);
            localStorage.setItem('password', data.user.email);
            navigate('/home');
        })
    }

    useEffect(() => {
        if (isCloseBtnClicked) {
            setTimeout(() => {
                navigate("/");
            }, 600);
        }
    }, [isCloseBtnClicked])
    return (
        <>
            <div className="signup">
                <div className={isCloseBtnClicked ? "signup-container close-signupModel-top" : "signup-container"}>
                    <img className="close-signupModel" src={cross} alt="cross-img" onClick={() => setIsCloseBtnClicked(true)} />
                    {
                        DisplayEmailPage == true ? (
                            <>
                                <div className="signup-container-top">
                                    <button className="google-button" onClick={handleSignInWithGoogle}>
                                        <img src={google} alt="" />
                                        <span>Continue with Google</span>
                                    </button>
                                </div>
                                <div className="separator">
                                    <span>or</span>
                                </div>
                                <div className="signup-container-middle">
                                    <input type="text" placeholder="Your email address or profile URL"
                                        onChange={handleEmailOnChange}
                                        value={email}
                                        className={emailError ? "error" : ""}
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
                        ) : DisplayEnterPasswordPage == true ? (<EnterPassword setSignIn={setSignIn} />) : DisplayForgotPasswordPage == true ? (<ForgotPassword setSignIn={setSignIn} />) :
                            (<EnterUserName setSignIn={setSignIn} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Signup;