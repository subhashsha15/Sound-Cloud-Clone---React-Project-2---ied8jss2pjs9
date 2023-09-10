import React, { useState, useEffect, useRef } from "react";
import './AudioPlayer.css';
import prevBtnImg from '../../../public/images/prevBtnImg.svg'
import playBtnImg from "../../../public/images/darkplayBtnImg.svg"
import pauseBtnImg from "../../../public/images/darkpauseBtnImg.svg"
import nextBtnImg from '../../../public/images/nextBtnImg.svg'
import beforerepeatBtnImg from '../../../public/images/beforerepeatBtnImg.svg'
import afterrepeatBtnImg from '../../../public/images/afterrepeatBtnImg.svg'
import beforeshuffleBtnImg from '../../../public/images/beforeshuffleBtnImg.svg'
import aftershuffleBtnImg from '../../../public/images/aftershuffleBtnImg.svg'
import volumeBtnImg from '../../../public/images/volumeBtnImg.svg'
import silentvolumeBtnImg from '../../../public/images/silentvolumeBtnImg.svg'
import darkfollowBtnImg from '../../../public/images/darkfollowBtnImg.svg'
import likeBtnImg from '../../../public/images/likebtn-img.svg'

const AudioPlayer = () => {
    // const [currentSongIndex, setCurrentSongIndex] = useState(0);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [isShuffle, setIsShuffle] = useState(false);
    // const [isRepeat, setIsRepeat] = useState(false);
    const [volume, setVolume] = useState({
        value: 0.5,
        isClicked: false,
    });
    const audioRef = useRef(null);

    // Function to handle play/pause
    // useEffect(() => {
    //     if (isPlayBtnClicked) {
    //         setIsPlaying(true);
    //     }
    // }, [isPlayBtnClicked]);

    // Function to play the next song
    // const playNextSong = () => {
    //     let newIndex = currentSongIndex + 1;
    //     if (isShuffle) {
    //         newIndex = Math.floor(Math.random() * songs.length);
    //     }
    //     if (newIndex >= songs.length) {
    //         newIndex = 0;
    //     }
    //     setCurrentSongIndex(newIndex);
    // }

    // Function to play the previous song
    // const playPreviousSong = () => {
    //     let newIndex = currentSongIndex - 1;
    //     if (newIndex < 0) {
    //         newIndex = songs.length - 1;
    //     }
    //     setCurrentSongIndex(newIndex);
    // }

    // Function to toggle shuffle mode
    // const toggleShuffle = () => {
    //     setIsShuffle(!isShuffle);
    // }

    // Function to toggle repeat mode
    // const toggleRepeat = () => {
    //     setIsRepeat(!isRepeat);
    // }

    // Function to handle volume change
    const handleVolumeChange = (newVolume) => {
        if (audioRef.current) { // Check if audioRef.current is not null
            audioRef.current.value = newVolume;
          }
        setVolume({
            ...volume,
            value: newVolume,
        });
    }
    const handleVolumeClick = () => {
        setVolume({
            ...volume,
            isClicked: !volume.isClicked
        });
    }
    // // Function to handle song end (for auto-play next song)
    // const handleSongEnd = () => {
    //     if (isRepeat) {
    //         audioRef.current.currentTime = 0;
    //         audioRef.current.play();
    //     } else {
    //         playNextSong();
    //     }
    // }
    return (
        <>
            <div className="audio-player">
                <div className="audio-player-container">
                    <div className="audio-player-controls">
                        <img src={prevBtnImg} alt="" />
                        <img src={playBtnImg && pauseBtnImg} alt="" />
                        <img src={nextBtnImg} alt="" />
                        <img src={beforerepeatBtnImg} alt="" />
                        <img src={beforeshuffleBtnImg} alt="" />
                    </div>
                    <div className="audio-player-progress-bar">
                        <div className="start-time">0:00</div>
                        <div className="bar-line"></div>
                        <div className="end-time">2:16</div>
                    </div>
                    <div className="audio-player-volume-control">
                        {volume.isClicked && (<input
                            ref={audioRef}
                            className="vertical-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume.value}
                            onChange={(e) => handleVolumeChange(e.target.value)}
                        />)}
                        <img src={audioRef && audioRef.current && audioRef.current.value == 0 ? silentvolumeBtnImg : volumeBtnImg} alt="" onClick={handleVolumeClick} />
                    </div>
                    <div className="audio-player-song-details">
                        <div className="about-song">
                            <img src="https://newton-project-resume-backend.s3.amazonaws.com/thumbnail/64cf907d47ae38c3e33a18a2.jpg" alt="" />
                            <div className="title">
                                <span>Panjab</span>
                                <span>Patti To Patiala</span>
                            </div>
                        </div>
                        <div className="actions-on-songs">
                            <img src={likeBtnImg} alt="" />
                            <img src={darkfollowBtnImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AudioPlayer;