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
import { useFetcher } from "react-router-dom";

const AudioPlayer = ({ isPlaying, clickedSong, setClickedSong, songsList, artistName, handleClickOnSong, setIsPlaying ,counter}) => {
    const audioRef = useRef(null);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [volume, setVolume] = useState({
        value: 0.5,
        isClicked: false,
    });

    // Function to toggle play/pause
    const togglePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.src = songsList[0]?.audio_url || songsList[0]?.data?.audio_url;
                audioRef.current.play().catch((error) => {
                    console.error("Failed to play audio:", error);
                });
                setIsPlaying(!isPlaying);
            } else {
                audioRef.current.pause();
                setIsPlaying(!isPlaying);
            }
        }
    }
    // Function to play the next song
    const playNextSong = () => {
        let newIndex = clickedSong + 1;
        if (isShuffle) {
            newIndex = Math.floor(Math.random() * songsList.length);
        }
        if (newIndex >= songsList.length) {
            newIndex = 0;
        }

        // Pause the current audio playback
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Set the new audio source and start playing
        if (audioRef.current) {
            audioRef.current.src = songsList[newIndex]?.audio_url || songsList[newIndex]?.data?.audio_url;
            audioRef.current.play().catch((error) => {
                console.error("Failed to play audio:", error);
            });
        }

        setClickedSong(newIndex);
        handleClickOnSong(songsList[clickedSong], newIndex);
    }

    // Function to play the previous song
    const playPreviousSong = () => {
        let newIndex = clickedSong - 1;
        if (newIndex < 0) {
            newIndex = songsList.length - 1;
        }

        // Pause the current audio playback
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Set the new audio source and start playing
        if (audioRef.current) {
            audioRef.current.src = songsList[newIndex]?.audio_url || songsList[newIndex]?.data?.audio_url;
            audioRef.current.play().catch((error) => {
                console.error("Failed to play audio:", error);
            });
        }

        setClickedSong(newIndex);
        handleClickOnSong(songsList[clickedSong], newIndex);
        // setIsPlaying(true);
    }

    // Function to toggle shuffle mode
    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    }

    // Function to toggle repeat mode
    const toggleRepeat = () => {
        setIsRepeat(!isRepeat);
    }

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
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume.value;
        }
    }, [volume.value]);
    // Function to handle song end (for auto-play next song)
    const handleSongEnd = () => {
        if (isRepeat) {
            audioRef.current.currentTime = 0;
            audioRef?.current.play();
        } else {
            playNextSong();
        }
    }

    useEffect(() => {
        console.log("from Audioplayer useeffect",clickedSong);
   
        // Check if the audio element exists and is currently playing
        if (audioRef.current && !audioRef.current.paused) {
            // Pause the audio before changing the source
            audioRef.current.pause();
        }

        if (audioRef.current && isPlaying == true) {
            audioRef.current.src = songsList[clickedSong]?.audio_url || songsList[clickedSong]?.data?.audio_url;
            audioRef.current.play();

            // Add a new event listener for the "ended" event
            audioRef.current.addEventListener("ended", handleSongEnd);
        }
    }, [audioRef,clickedSong,counter]);

console.log("audioref from useeffect",audioRef);
    return (
        <>
            <div className="audio-player">
                <div className="audio-player-container">
                    <div className="audio-player-controls">
                        <img src={prevBtnImg} alt="" onClick={playPreviousSong} />
                        <img src={isPlaying ? pauseBtnImg : playBtnImg} alt="" onClick={togglePlayPause} />
                        <img src={nextBtnImg} alt="" onClick={playNextSong} />
                        <img src={isRepeat ? afterrepeatBtnImg : beforerepeatBtnImg} alt="" onClick={toggleRepeat} />
                        <img src={isShuffle ? aftershuffleBtnImg : beforeshuffleBtnImg} alt="" onClick={toggleShuffle} />
                    </div>
                    <div className="audio-player-progress-bar">
                        <div className="start-time">0:0</div>
                        <div className="bar-line"></div>
                        <div className="end-time">0:25</div>
                    </div>
                    <div className="audio-player-volume-control">
                        {volume.isClicked && (<input
                            className="vertical-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume.value}
                            onChange={(e) => handleVolumeChange(e.target.value)}
                        />)}
                        <img src={volume.value == 0 ? silentvolumeBtnImg : volumeBtnImg} alt="" onClick={handleVolumeClick} />
                    </div>
                    <div className="audio-player-song-details">
                        <div className="about-song">
                            <img src={songsList[clickedSong]?.thumbnail || songsList[clickedSong]?.data?.thumbnail} alt="" />
                            <div className="title">
                                <span>{songsList[clickedSong]?.title || songsList[clickedSong]?.data?.title}</span>
                                <span>{artistName}</span>
                            </div>
                        </div>
                    </div>
                    <div><audio ref={audioRef} src=""></audio></div>
                </div>
            </div>
        </>
    )
}
export default AudioPlayer;