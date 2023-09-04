import React, { useContext, useState } from "react";
import './Artists.css'
// import { ArtistsContext } from "../App";
import { ArtistsContext } from "../App";
const Artist = ({ artistItem }) => {
    console.log("artist re-render");
    const [isFollowBtnClicked, setIsFollowBtnCliked] = useState(false);
    const {followingArtists,setFollowingArtists}=useContext(ArtistsContext);
    // const { followingArtistsRef } = useContext(ArtistsContext);
    const handleFollowBtn = () => {
        setIsFollowBtnCliked(prevstate => !prevstate);
        setFollowingArtists([...followingArtists,{artistItem}]); 
        // followingArtistsRef.current.push(artistItem);
    }
    return (
        <>
            {artistItem && (<div className="artist">
                <div className="artist-img">
                    <img src={artistItem.image} alt="" />
                </div>
                <div className="artist-about">
                    <span className="artist-name">{artistItem.name}</span>
                    <ul>
                        <li className="artist-followers">
                            <img src="/public/images/doubleperson-thumbnail.svg" alt="" />
                            <span>590</span>
                        </li>
                        <li className="artist-numberofsongs">
                            <img src="/public/images/song-graph.svg" alt="" />
                            <span>{artistItem.songs.length}</span>
                        </li>
                    </ul>
                </div>
                <button className={isFollowBtnClicked ? "follow-btn clicked" : "follow-btn"} onClick={handleFollowBtn}>
                    <img src={isFollowBtnClicked ? "/public/images/followbtn-clicked.svg" : "/public/images/follow-img.svg"} alt="" />
                    <span>{isFollowBtnClicked ? "Following" : "Follow"}</span>
                </button>
            </div>)}
        </>
    )
}
export default Artist;