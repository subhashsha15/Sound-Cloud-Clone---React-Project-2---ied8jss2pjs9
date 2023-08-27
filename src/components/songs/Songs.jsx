import React, { useEffect, useState } from "react"
import './Songs.css'
import PlayButton from "../playbutton/PlayButton";
import Artist from "../artists/Artists";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Songs = () => {
    const songList = useSelector((store) => store.songListing.songList);
    console.log("songList=",songList);
    return (
        <>
            <div className="songs">
                <div className="songs-container">
                    <div className="songs-container-top">
                        <div className="songs-container-top-left">
                            <div className="song-details">
                                <span className="playbtn">
                                    <PlayButton />
                                </span>
                                <span>
                                    <div className="song-title">Top 50: All music genres</div>
                                    <h2 className="song-genre">SoundCloud</h2>
                                </span>
                            </div>
                            <div className="tracks">
                                <div>50</div>
                                <div>Tracks</div>
                                <div>2:57:47</div>
                            </div>
                        </div>
                        <div className="songs-container-top-right">
                            <span>Updated 1 day ago</span>
                            <img src="https://i1.sndcdn.com/artworks-IUGymdr2RdwwZmy6-1UrjzQ-t500x500.jpg" alt="" />
                        </div>
                    </div>
                    <div className="songs-container-middle">
                        <div className="songs-container-middle-left">
                            <div className="songs-container-middle-left-topIcons">
                                <div className="songs-container-middle-left-topIcons-buttons">
                                    <button className="like-btn">
                                        <img src="/public/images/likebtn-img.svg" alt="" />
                                        <span>Like</span>
                                    </button>
                                    <button className="share-btn">
                                        <img src="/public/images/sharebtn-img.svg" alt="" />
                                        <span>Share</span>
                                    </button>
                                    <button className="like-btn">
                                        <img src="/public/images/nextbtn-img.svg" alt="" />
                                        <span>Add to Next up</span>
                                    </button>
                                    <button className="like-btn">
                                        <img src="/public/images/playlistbtn-img.svg" alt="" />
                                        <span>Add to playlist</span>
                                    </button>
                                </div>
                                <div className="songs-container-middle-left-topIcons-likes">
                                    <img src="/public/images/Likeimage.svg" alt="" />
                                    <span>3,383</span>
                                </div>
                            </div>
                            <div className="songs-container-middle-left-songs">
                                <div className="songs-container-middle-left-song">
                                    <div className="songs-container-middle-left-songdetails">
                                        <div className="thumbnail-img">
                                            <img src="https://i1.sndcdn.com/artworks-IUGymdr2RdwwZmy6-1UrjzQ-t500x500.jpg" alt="" />
                                        </div>
                                        <div className="index">1</div>
                                        <div className="songDetail">
                                            <span>callmesenoreata</span>
                                            -
                                            <span>100 Days Of Love</span>
                                        </div>
                                    </div>
                                    <div className="numberofLikes">
                                        <img src="/public/images/playImage.svg" alt="" />
                                        <span>898K</span>
                                    </div>
                                    <div className="songs-container-middle-left-song-playbtn">
                                        <PlayButton />
                                        <div>
                                            <button>
                                                <img src="/public/images/likebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/repost-img.svg" alt="" />
                                            </button>
                                            <button className="share-btn">
                                                <img src="/public/images/sharebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/copylink-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/more-img.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="songs-container-middle-left-song">
                                    <div className="songs-container-middle-left-songdetails">
                                        <div className="thumbnail-img">
                                            <img src="https://i1.sndcdn.com/artworks-IUGymdr2RdwwZmy6-1UrjzQ-t500x500.jpg" alt="" />
                                        </div>
                                        <div className="index">1</div>
                                        <div className="songDetail">
                                            <span>callmesenoreata</span>
                                            -
                                            <span>100 Days Of Love</span>
                                        </div>
                                    </div>
                                    <div className="numberofLikes">
                                        <img src="/public/images/playImage.svg" alt="" />
                                        <span>898K</span>
                                    </div>
                                    <div className="songs-container-middle-left-song-playbtn">
                                        <PlayButton />
                                        <div>
                                            <button>
                                                <img src="/public/images/likebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/repost-img.svg" alt="" />
                                            </button>
                                            <button className="share-btn">
                                                <img src="/public/images/sharebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/copylink-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/more-img.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="songs-container-middle-left-song">
                                    <div className="songs-container-middle-left-songdetails">
                                        <div className="thumbnail-img">
                                            <img src="https://i1.sndcdn.com/artworks-IUGymdr2RdwwZmy6-1UrjzQ-t500x500.jpg" alt="" />
                                        </div>
                                        <div className="index">1</div>
                                        <div className="songDetail">
                                            <span>callmesenoreata</span>
                                            -
                                            <span>100 Days Of Love</span>
                                        </div>
                                    </div>
                                    <div className="numberofLikes">
                                        <img src="/public/images/playImage.svg" alt="" />
                                        <span>898K</span>
                                    </div>
                                    <div className="songs-container-middle-left-song-playbtn">
                                        <PlayButton />
                                        <div>
                                            <button>
                                                <img src="/public/images/likebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/repost-img.svg" alt="" />
                                            </button>
                                            <button className="share-btn">
                                                <img src="/public/images/sharebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/copylink-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/more-img.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="songs-container-middle-left-song">
                                    <div className="songs-container-middle-left-songdetails">
                                        <div className="thumbnail-img">
                                            <img src="https://i1.sndcdn.com/artworks-IUGymdr2RdwwZmy6-1UrjzQ-t500x500.jpg" alt="" />
                                        </div>
                                        <div className="index">1</div>
                                        <div className="songDetail">
                                            <span>callmesenoreata</span>
                                            -
                                            <span>100 Days Of Love</span>
                                        </div>
                                    </div>
                                    <div className="numberofLikes">
                                        <img src="/public/images/playImage.svg" alt="" />
                                        <span>898K</span>
                                    </div>
                                    <div className="songs-container-middle-left-song-playbtn">
                                        <PlayButton />
                                        <div>
                                            <button>
                                                <img src="/public/images/likebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/repost-img.svg" alt="" />
                                            </button>
                                            <button className="share-btn">
                                                <img src="/public/images/sharebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/copylink-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/more-img.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="songs-container-middle-left-song">
                                    <div className="songs-container-middle-left-songdetails">
                                        <div className="thumbnail-img">
                                            <img src="https://i1.sndcdn.com/artworks-IUGymdr2RdwwZmy6-1UrjzQ-t500x500.jpg" alt="" />
                                        </div>
                                        <div className="index">1</div>
                                        <div className="songDetail">
                                            <span>callmesenoreata</span>
                                            -
                                            <span>100 Days Of Love</span>
                                        </div>
                                    </div>
                                    <div className="numberofLikes">
                                        <img src="/public/images/playImage.svg" alt="" />
                                        <span>898K</span>
                                    </div>
                                    <div className="songs-container-middle-left-song-playbtn">
                                        <PlayButton />
                                        <div>
                                            <button>
                                                <img src="/public/images/likebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/repost-img.svg" alt="" />
                                            </button>
                                            <button className="share-btn">
                                                <img src="/public/images/sharebtn-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/copylink-img.svg" alt="" />
                                            </button>
                                            <button>
                                                <img src="/public/images/more-img.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="songs-container-bottom">
                            </div>
                        </div>
                        <div className="songs-container-middle-right">
                            <p>The most played Pop tracks on SoundCloud this week</p>
                            <div className="artists-featured-heading">
                                <img src="/public/images/singleperson-thumbnail.svg" alt="" />
                                <span>Artists featured</span>
                            </div>
                            <div className="artists-featured-items">
                                <Artist />
                                <Artist />
                                <Artist />
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Songs;