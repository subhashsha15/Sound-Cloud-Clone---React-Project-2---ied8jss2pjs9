import React from "react";
import './Artists.css'

const Artist = () => {
    return (
        <>
            <div className="artist">
                <div className="artist-img">
                    <img src="" alt="" />
                </div>
                <div className="artist-about">
                    <span className="artist-name">callmesenoreata</span>
                    <ul>
                        <li className="artist-followers">
                            <img src="/public/images/doubleperson-thumbnail.svg" alt="" />
                            <span>590</span>
                        </li>
                        <li className="artist-numberofsongs">
                            <img src="/public/images/song-graph.svg" alt="" />
                            <span>20</span>
                        </li>
                    </ul>
                </div>
                <button className="follow-btn">
                    <img src="/public/images/follow-img.svg"  alt="" />
                    <span>Follow</span>
                </button>
            </div>
        </>
    )
}
export default Artist;