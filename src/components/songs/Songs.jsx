import React, { useEffect, useState } from "react"
import './Songs.css'
import PlayButton from "../playbutton/PlayButton";
import Artist from "../artists/Artists";
import Footer from "../footer/Footer";
import axios from "axios";
import { useParams } from 'react-router-dom';
const Songs = () => {
    console.log("songs re-render");
    const { id: albumId } = useParams();
    const [songsList, setSongsList] = useState([]);
    const [artistsList, setArtistsList] = useState([]);
    const [clickedSong, setClickedSong] = useState(0);
    const headers = {
        'projectId': 'ied8jss2pjs9',
    };
    useEffect(() => {
        axios.get(`https://academics.newtonschool.co/api/v1/music/album/${albumId}`, { headers })
            .then((response) => {
                const data = response.data.data;
                console.log("response=", data)
                setSongsList(data.songs)
                setArtistsList(data.artists)
                console.log(data.artists)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const handleClickOnSong = (index) => {
        setClickedSong(index);
    }

    return (
        <>
            <div className="songs">
                <div className="songs-container">
                    <div className="songs-container-top">
                        <div className="songs-container-top-left">
                            <div className="song-details">
                                <span className="playbtn">
                                    <PlayButton audioUrl={songsList[clickedSong]?.audio_url} />
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
                            <img src={songsList[clickedSong]?.thumbnail} alt="" />
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
                            {
                                songsList.map((songItem, index) => {
                                    if (songItem.album == albumId) {
                                        return (<div className="songs-container-middle-left-songs" onClick={() => handleClickOnSong(index)}>
                                            <div className="songs-container-middle-left-song">
                                                <div className="songs-container-middle-left-songdetails">
                                                    <div className="thumbnail-img">
                                                        <img src={songItem.thumbnail} alt="" />
                                                    </div>
                                                    <div className="index">{index + 1}</div>
                                                    <div className="songDetail">
                                                        <span>{songItem.title}</span>
                                                        -
                                                        <span>{songItem.mood}</span>
                                                    </div>
                                                </div>
                                                <div className="numberofLikes">
                                                    <img src="/public/images/playImage.svg" alt="" />
                                                    <span>898K</span>
                                                </div>
                                                <div className="songs-container-middle-left-song-playbtn">
                                                    <PlayButton audioUrl={songItem.audio_url} />
                                                    <div>
                                                        <button>
                                                            <img src="/public/images/likebtn-img.svg" alt="" title="Like"/>
                                                        </button>
                                                        <button>
                                                            <img src="/public/images/repost-img.svg" alt="" title="Repost"/>
                                                        </button>
                                                        <button className="share-btn">
                                                            <img src="/public/images/sharebtn-img.svg" alt="" title="Share"/>
                                                        </button>
                                                        <button>
                                                            <img src="/public/images/copylink-img.svg" alt="" title="Copy Link"/>
                                                        </button>
                                                        <button>
                                                            <img src="/public/images/more-img.svg" alt="" title="More"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                })
                            }
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
                                {
                                    artistsList.map((artistItem) => (<Artist artistItem={artistItem} />))
                                }
                            </div>
                            <Footer fontsize={14}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Songs;