import React from "react"
import "./ComingSoon.css"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
const ComingSoon = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="comingsoon">
                <div className="coming-soon-container">
                    <h1>404</h1>
                    <p>Sorry, we were unable to find that page</p>
                    <p>Start from
                        <Link to="/home" className="link">
                            <span>home page</span>
                        </Link>
                    </p>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </>
    )
}
export default ComingSoon;