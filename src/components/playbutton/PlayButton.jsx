import React, { useState, useRef, useEffect } from "react";
import './PlayButton.css';
import playImg from '../../../public/images/playbutton-img.svg'
import PauseIcon from '@material-ui/icons/Pause';
const PlayButton = (props) => {
    // console.log("audio props=",props);
    const [playBtn, setPlayBtn] = useState("off");
    // const audioRef = useRef(null);

    const handlePlayPause = () => {
        props.setIsPlaying(!props.isPlaying);
    }
    useEffect(() => {
        if (props.isPlaying) {
            props.audioRef.current.currentTime = 0;
            if (props.audioRef?.current) {
                props.audioRef?.current.play();
                setPlayBtn('on');
            }
        } else {
            if (props.audioRef?.current) {
                props.audioRef?.current.pause();
                setPlayBtn('off');
            }
        }
    }, [props.isPlaying]);

    return (
        <>
            <div className="playbutton" onClick={handlePlayPause}>
                {playBtn == "off" ? <img src={playImg} alt="" /> : <div className="pausebtn"><PauseIcon fontSize="large" /></div>}
                <audio ref={props.audioRef} src={props.audioUrl || props.audio_url || props.props} ></audio>
            </div>
        </>
    )
}

export default PlayButton;