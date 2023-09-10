import React, { useEffect, useState } from "react"
import './Songs.css'
import PlayButton from "../playbutton/PlayButton";
import Artist from "../artists/Artists";
import Footer from "../footer/Footer";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { secondsToHMS, formatDate, headers, generateThreeDigitRandomNumber, generateFourDigitRandomNumber } from '../../miscellaneous/miscellaneous';
import likedBtnImg from '../../../public/images/likedbtn-img.svg'
import likeBtnImg from '../../../public/images/likebtn-img.svg'
import shareBtnImg from '../../../public/images/sharebtn-img.svg'
import nextBtnImg from '../../../public/images/nextbtn-img.svg'
import playlistBtnImg from '../../../public/images/playlistbtn-img.svg'
import likeImg from '../../../public/images/Likeimage.svg'
import playImg from '../../../public/images/playImage.svg'
import repostBtnImg from '../../../public/images/repost-img.svg'
import copylinkBtnImg from '../../../public/images/copylink-img.svg'
import moreImg from '../../../public/images/more-img.svg'
import singlePersonThumbnailImg from '../../../public/images/singleperson-thumbnail.svg'
import Loader from "../loader/Loader"
import AudioPlayer from "../audioPlayer/AudioPlayer";
const Playlist = [];
const Songs = () => {
    const { id: albumId } = useParams();
    const [songsList, setSongsList] = useState([]);
    const [likedSongs, setLikedSongs] = useState({});
    const [currentSongLiked, setCurrentSongLiked] = useState(false);
    const [artistsList, setArtistsList] = useState([]);
    const [artistName, setArtistName] = useState('');
    const [totalPlayTime, setTotalPlayTime] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [clickedSong, setClickedSong] = useState(0);
    const [isAddtoPlaylistBtnClicked, setIsAddtoPlaylistBtnCliked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://academics.newtonschool.co/api/v1/music/album/${albumId}`, { headers })
            .then((response) => {
                const data = response.data.data;
                setSongsList(data.songs)
                setArtistsList(data.artists)
                setTotalPlayTime(secondsToHMS(data.songs.length * 210));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);


    const handleClickOnSong = (songItem, index) => {
        const artistDetails = artistsList.find((artistObject) => artistObject._id === songItem.artist[0])
        setReleasedDate(formatDate(songItem.dateOfRelease));
        setArtistName(artistDetails.name);
        setClickedSong(index);
        setIsAddtoPlaylistBtnCliked(false);
    }

    const handleCurrentSongLiked = (song, index) => {
        setCurrentSongLiked(!currentSongLiked);
        handleLikeBtn(song, index);
    }

    const handleLikeBtn = (songItem, index) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            'projectId': 'ied8jss2pjs9',
        };

        const BODY = {
            "songId": `${songItem._id}`
        }

        axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', BODY, { headers })
            .then((response) => {
                // console.log("like response", response);
            })
            .catch((error) => {
                console.log(error.message);
            });

        setLikedSongs(prevLikedSongs => ({
            ...prevLikedSongs,
            [index]: !prevLikedSongs[index],
        }));
    }
    const handleAddtoPlayList = () => {
        setIsAddtoPlaylistBtnCliked(true);
        const isObjectInArray = Playlist.some((item) => {
            return item.title === songsList[clickedSong].title;
        });
        if (isObjectInArray) {
            return;
        }
        else {
            Playlist.push(songsList ? songsList[clickedSong] : {});
        }
        localStorage.setItem('Playlist', JSON.stringify(Playlist))
    }

    return (
        <>
            <div className="songs">
                {loading ? <Loader /> : (<div className="songs-container">
                    <div className="songs-container-top">
                        <div className="songs-container-top-left">
                            <div className="song-details">
                                <span className="playbtn">
                                    <PlayButton audioUrl={songsList[clickedSong]?.audio_url} />
                                </span>
                                <span>
                                    <div className="song-title">{songsList[clickedSong]?.title}</div>
                                    {artistName && <h2 className="song-genre">{artistName}</h2>}
                                </span>
                            </div>
                            <div className="tracks">
                                <div>{songsList.length}</div>
                                <div>{songsList.length > 1 ? "Tracks" : "Track"}</div>
                                <div>{totalPlayTime}</div>
                            </div>
                        </div>
                        <div className="songs-container-top-right">
                            <span>{releasedDate}</span>
                            <img src={songsList[clickedSong]?.thumbnail} alt="" />
                        </div>
                    </div>
                    <div className="songs-container-middle">
                        <div className="songs-container-middle-left">
                            <div className="songs-container-middle-left-topIcons">
                                <div className="songs-container-middle-left-topIcons-buttons">
                                    <button
                                        className={currentSongLiked ? "likedbtn-active" : "like-btn"}
                                        onClick={() => handleCurrentSongLiked(songsList[clickedSong], clickedSong)}>
                                        <img src={currentSongLiked ? likedBtnImg : likeBtnImg}
                                            alt="" />
                                        <span>Like</span>
                                    </button>
                                    <button className="share-btn">
                                        <img src={shareBtnImg} alt="" />
                                        <span>Share</span>
                                    </button>
                                    <button >
                                        <img src={nextBtnImg} alt="" />
                                        <span>Add to Next up</span>
                                    </button>
                                    <button className={isAddtoPlaylistBtnClicked && "addtoPlaylistBtnClicked"} onClick={handleAddtoPlayList}>
                                        <img src={playlistBtnImg} alt="" />
                                        <span>Add to playlist</span>
                                    </button>
                                </div>
                                <div className="songs-container-middle-left-topIcons-likes">
                                    <img src={likeImg} alt="" />
                                    <span>{generateFourDigitRandomNumber()}</span>
                                </div>
                            </div>
                            {
                                songsList.map((songItem, index) => {
                                    if (songItem.album == albumId) {
                                        return (<div className="songs-container-middle-left-songs" onClick={() => handleClickOnSong(songItem, index)}>
                                            <div className="songs-container-middle-left-song">
                                                <div className="songs-container-middle-left-songdetails">
                                                    <div className="thumbnail-img">
                                                        <img src={songItem.thumbnail} alt="" />
                                                    </div>
                                                    <div className="index">{index + 1}</div>
                                                    <div className="songDetail" >
                                                        <span>{songItem.title}</span>
                                                        -
                                                        <span>{songItem.mood}</span>
                                                    </div>
                                                </div>
                                                <div className="numberofLikes">
                                                    <img src={playImg} alt="" />
                                                    <span>{generateThreeDigitRandomNumber()}</span>
                                                </div>
                                                <div className="songs-container-middle-left-song-playbtn">
                                                    <PlayButton audioUrl={songItem.audio_url} />
                                                    <div>
                                                        <button className={likedSongs[index] ? "likedbtn-active" : "" ? "likedbtn-active" : ""}>
                                                            <img src={likedSongs[index] ? likedBtnImg : likeBtnImg}
                                                                alt=""
                                                                title={likedSongs[index] ? "likedbtn-active" : "" ? "Unlike" : "Like"}
                                                                onClick={() => handleLikeBtn(songItem, index)}
                                                            />
                                                        </button>
                                                        <button>
                                                            <img src={repostBtnImg} alt="" title="Repost" />
                                                        </button>
                                                        <button className="share-btn">
                                                            <img src={shareBtnImg} alt="" title="Share" />
                                                        </button>
                                                        <button>
                                                            <img src={copylinkBtnImg} alt="" title="Copy Link" />
                                                        </button>
                                                        <button>
                                                            <img src={moreImg} alt="" title="More" />
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
                                <img src={singlePersonThumbnailImg} alt="" />
                                <span>Artists featured</span>
                            </div>
                            <div className="artists-featured-items">
                                {
                                    artistsList.map((artistItem) => (<Artist artistItem={artistItem} />))
                                }
                            </div>
                            <Footer fontsize={14} />
                        </div>
                    </div>
                </div>
                )}
                <AudioPlayer />
            </div>
        </>
    )
}

export default Songs;