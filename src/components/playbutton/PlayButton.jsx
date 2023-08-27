import React, { useState,useRef } from "react";
import './PlayButton.css';
import playImg from '../../../public/images/playbutton-img.svg'
import PauseIcon from '@material-ui/icons/Pause';
const PlayButton = () => {
    const [playBtn,setPlayBtn]=useState("off");
    const audioRef = useRef(null);
    const handlePlayButton=()=>{
        if(playBtn=="off"){
            audioRef.current.play();
            setPlayBtn('on');
        }
        else{
            audioRef.current.pause();
            setPlayBtn('off');
        }
    }
    return (
        <>
            <div className="playbutton" onClick={handlePlayButton}>
                {playBtn=="off"?<img src={playImg} alt="" />:<div className="pausebtn"><PauseIcon fontSize="large"/></div> }
                <audio ref={audioRef} src="https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf90a247ae38c3e33a1b99.mp3"></audio>
            </div>
        </>
    )
}

export default PlayButton;