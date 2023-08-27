import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = (props) => {
    return (
        <>
            <div className="forgotpassword-container">
                <div className="forgotpassword-container-top">
                    Don’t know your password?
                </div>
                <div className="forgotpassword-container-middle">
                    <div className="forgotpassword-email-box">
                        <label htmlFor="email">Your email address or profile URL</label>
                        <input type="email" id="email" className="btn" placeholder="Your email address or profile URL" />
                    </div>
                    <div className="para">
                        We’ll send you a link to change your password. If you still need help, <span>visit our Help Center</span>.
                    </div>
                    <button className="continue-button btn">Request a password reset</button>
                </div>
                <div className="forgotpassword-container-bottom"
                onClick={() => props.setSignIn({
                    DisplayEmailPage: true,
                    DisplayEnterPasswordPage: false,
                    DisplayForgotPasswordPage: false,
                })}
                >
                    Cancel
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;