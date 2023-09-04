import React from "react";
import './Likes.css'
import Footer from "../../../components/footer/Footer";
const Likes = () => {
    return (
        <>
            <div className="likes">
                <div className="likes-heading">
                    Hear the tracks you’ve liked:
                </div>
                <div className="likes-content">
                    content
                </div>
                <div className="likes-footer">
                    <Footer fontsize={14}/>
                </div>
            </div>
        </>
    )
}
export default Likes;