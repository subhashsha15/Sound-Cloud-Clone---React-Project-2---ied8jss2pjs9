import React from "react";
import './Following.css'
import Footer from "../../../components/footer/Footer";
import doublePersonthumbnailImg from '../../../../public/images/doubleperson-thumbnail.svg'
const Following = () => {
    const ArtistsFollowingList = JSON.parse(localStorage.getItem('ArtistsFollowingList'));
    return (
        <>
            <div className="following">
                <div className="following-heading">
                    Hear what the people you follow have posted:
                </div>
                <div className="following-content">

                    {
                        ArtistsFollowingList?.map((item) => (
                            <>
                                <div className="following-artist-details">
                                    <div className="artist-image">
                                        <img src={item.artistItem.image} alt="" />
                                    </div>
                                    <div>{item.artistItem.name}</div>
                                    <div>
                                        <img src={doublePersonthumbnailImg} alt="" />
                                        <span>{item.followerCount+1} followers</span>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className="following-footer">
                    <Footer fontsize={14} />
                </div>
            </div>
        </>
    )
}
export default Following;