import React, { useEffect, useState } from "react";
import './Artists.css'
import { generateTwoDigitRandomNumber, artistApiCall } from '../../miscellaneous/miscellaneous'
import doublePersonThumbnail from '../../../public/images/doubleperson-thumbnail.svg';
import songGraph from '../../../public/images/song-graph.svg';
import followImg from '../../../public/images/follow-img.svg';
import followedImg from '../../../public/images/followbtn-clicked.svg';
const artistsFollowingList = [];
const Artist = ({ artistItem, onClick}) => {
    console.log("Artist");
    const [isFollowBtnClicked, setIsFollowBtnCliked] = useState(false);
    const [followerCount, setFollowerCount] = useState(generateTwoDigitRandomNumber());

    const handleFollowBtn = () => {
        setIsFollowBtnCliked(prevIsFollowBtnClicked => !prevIsFollowBtnClicked);
        setFollowerCount((prevCount) => { return !isFollowBtnClicked ? prevCount + 1 : prevCount - 1 });
        const isObjectInArray = artistsFollowingList.some((item) => {
            return item.artistItem._id === artistItem._id;
        });

        if (isObjectInArray) {
            return;
        }
        else {
            artistsFollowingList.push({ artistItem, followerCount });
        }

        localStorage.setItem('ArtistsFollowingList', JSON.stringify(artistsFollowingList))

        // updateSongsList(artistItem); // Call the API and update the songsList
    }

    return (
        <>
            {artistItem && (<div className="artist" >
                <div className="artist-img" onClick={onClick}>
                    <img src={artistItem.image} alt="" />
                </div>
                <div className="artist-about" onClick={onClick}>
                    <span className="artist-name">{artistItem.name}</span>
                    <ul>
                        <li className="artist-followers">
                            <img src={doublePersonThumbnail} alt="" />
                            <span>{followerCount}</span>
                        </li>
                        <li className="artist-numberofsongs">
                            <img src={songGraph} alt="" />
                            <span>{artistItem.songs.length}</span>
                        </li>
                    </ul>
                </div>
                <button id="followBtn" className={isFollowBtnClicked ? "follow-btn clicked" : "follow-btn"} onClick={handleFollowBtn}>
                    <img src={isFollowBtnClicked ? followedImg : followImg} alt="" />
                    <span>{isFollowBtnClicked ? "Following" : "Follow"}</span>
                </button>
            </div>)}
        </>
    )
}
export default Artist;