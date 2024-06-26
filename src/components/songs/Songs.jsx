import React, { useEffect, useState, useRef } from "react"
import './Songs.css'
import PlayButton from "../playbutton/PlayButton";
import Artist from "../artists/Artists";
import Footer from "../footer/Footer";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { secondsToHMS, formatDate, headers, generateThreeDigitRandomNumber, generateFourDigitRandomNumber, artistApiCall } from '../../miscellaneous/miscellaneous';
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
let artistDetails;
const Songs = () => {
    const audioRef = useRef(null);
    const { id: albumId } = useParams();
    const [counter, setCounter] = useState(0);
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
    const [loading1, setLoading1] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

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
        artistDetails = artistsList.find((artistObject) => artistObject?._id === songItem?.artist?.[0])
        setReleasedDate(formatDate(songItem?.dateOfRelease || songItem?.data?.dateOfRelease));
        setArtistName(songItem.data ? songItem?.data?.artist[0].name : artistDetails?.name);
        setClickedSong(index);
        setIsAddtoPlaylistBtnCliked(false);
        setIsPlaying(true);
        setCounter(counter + 1);
        console.log("songClicked from handleClickSong-index=", index);
        console.log("songClicked from handleClickSong-songItem=", songItem);
    }

    const handleCurrentSongLiked = (song, index) => {
        setCurrentSongLiked(!currentSongLiked);
        handleLikeBtn(song || song?.data, index);
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

    const handleUpdateSongsList = async (artistItem) => {
        try {
            // Call the API here and update the "songsList" state based on the artistItem
            setLoading1(true);
            const updatedSongs = await artistApiCall(artistItem?.songs || artistItem?.data?.songs);
            setLoading1(false);

            // Check if updatedSongs is an array before setting it in state
            if (Array.isArray(updatedSongs)) {
                setSongsList(updatedSongs);
            } else {
                console.error("Updated songs data is not an array:", updatedSongs);
            }
        } catch (error) {
            console.error("Error fetching songs data:", error);
        }
    }

    const handleClick = (e) => {
        e.stopPropagation();
    }
    console.log("artistList", artistsList);
    console.log("songsList", songsList);
    return (
        <>
            <div className="songs">
                {loading ? <Loader /> : (<div className="songs-container">
                    <div className="songs-container-top">
                        <div className="songs-container-top-left">
                            <div className="song-details">
                                <span className="playbtn" onClick={handleClick}>
                                    <PlayButton
                                        audioUrl={songsList[clickedSong]?.audio_url || songsList[clickedSong]?.data.audio_url}
                                        audioRef={audioRef}
                                        isPlaying={isPlaying}
                                        setIsPlaying={setIsPlaying}
                                        disable="true"
                                    />
                                </span>
                                <span>
                                    <div className="song-title">{songsList[clickedSong]?.title || songsList[clickedSong]?.data.title}</div>
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
                            <img src={songsList[clickedSong]?.thumbnail || songsList[clickedSong]?.data.thumbnail} alt="" />
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
                                    <button className="share-btn" onClick={() => alert("This feature is coming soon,please come back later")}>
                                        <img src={shareBtnImg} alt="" />
                                        <span>Share</span>
                                    </button>
                                    <button onClick={() => alert("This feature is coming soon,please come back later")}>
                                        <img src={nextBtnImg} alt="" />
                                        <span>Add to Next up</span>
                                    </button>
                                    <button className={isAddtoPlaylistBtnClicked ? "addtoPlaylistBtnClicked" : ""} onClick={handleAddtoPlayList}>
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
                                loading1 ? <Loader /> : (songsList.map((songItem, index) => {
                                    // if (songItem?.album == albumId || songItem?.data?.album != albumId) {
                                    return (<div className={clickedSong == index ? "songs-container-middle-left-songs currentSongPlaying" : "songs-container-middle-left-songs"} onClick={() => handleClickOnSong(songItem, index)}>
                                        <div className="songs-container-middle-left-song">
                                            <div className="songs-container-middle-left-songdetails">
                                                <div className="thumbnail-img">
                                                    <img src={songItem?.thumbnail || songItem?.data?.thumbnail} alt="" />
                                                </div>
                                                <div className="index">{index + 1}</div>
                                                <div className="songDetail" >
                                                    <span>{songItem?.title || songItem?.data?.title}</span>
                                                    -
                                                    <span>{songItem?.mood || songItem?.data?.mood}</span>
                                                </div>
                                            </div>
                                            <div className="numberofLikes">
                                                <img src={playImg} alt="" />
                                                <span>{generateThreeDigitRandomNumber()}</span>
                                            </div>
                                            <div className="songs-container-middle-left-song-playbtn">
                                                {/* <PlayButton
                                                        isPlaying={isPlaying}
                                                        setIsPlaying={setIsPlaying}
                                                        // audioRef={audioRef}
                                                        audioUrl={songItem?.audio_url || songItem?.data?.audio_url}
                                                    /> */}
                                                <div className="currentSongPlaying">
                                                    <button className={likedSongs[index] ? "likedbtn-active" : "" ? "likedbtn-active" : ""}>
                                                        <img src={likedSongs[index] ? likedBtnImg : likeBtnImg}
                                                            alt=""
                                                            title={likedSongs[index] ? "likedbtn-active" : "" ? "Unlike" : "Like"}
                                                            onClick={() => handleLikeBtn(songItem, index)}
                                                        />
                                                    </button>
                                                    <button onClick={() => alert("This feature is coming soon,please come back later")}>
                                                        <img src={repostBtnImg} alt="" title="Repost" />
                                                    </button>
                                                    <button className="share-btn" onClick={() => alert("This feature is coming soon,please come back later")}>
                                                        <img src={shareBtnImg} alt="" title="Share" />
                                                    </button>
                                                    <button onClick={() => alert("This feature is coming soon,please come back later")}>
                                                        <img src={copylinkBtnImg} alt="" title="Copy Link" />
                                                    </button>
                                                    <button onClick={() => alert("This feature is coming soon,please come back later")}>
                                                        <img src={moreImg} alt="" title="More" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                    // }
                                }))
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
                                    artistsList.map((artistItem) => (<Artist
                                        artistItem={artistItem}
                                        onClick={() => handleUpdateSongsList(artistItem)}
                                    // updateSongsList={handleUpdateSongsList}
                                    />))
                                }
                            </div>
                            <Footer fontsize={14} />
                        </div>
                    </div>
                </div>
                )}
                <AudioPlayer
                    isPlaying={isPlaying}
                    // audioRef={audioRef}
                    counter={counter}
                    clickedSong={clickedSong}
                    setClickedSong={setClickedSong}
                    songsList={songsList}
                    artistName={artistName}
                    handleClickOnSong={handleClickOnSong}
                    setIsPlaying={setIsPlaying}
                />
            </div>
        </>
    )
}

export default Songs;