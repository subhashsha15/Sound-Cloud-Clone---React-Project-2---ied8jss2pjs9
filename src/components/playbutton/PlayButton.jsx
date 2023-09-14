import React, { useState, useRef, useEffect } from "react";
import './PlayButton.css';
import playImg from '../../../public/images/playbutton-img.svg'
import PauseIcon from '@material-ui/icons/Pause';
const PlayButton = (props) => {
    // console.log("props from home",props);
    const [playBtn, setPlayBtn] = useState("off");
    const handlePlayPause = () => {
        props?.setIsPlaying(!props?.isPlaying);
        console.log("clicked on handleplaypause",props.audio_url );
        console.log("clicked on handleplaypause props",props );
        if(props.isPlaying==undefined){
            setPlayBtn("on")
        }
    }

    useEffect(() => {
        console.log("props changed0")
        if (props?.isPlaying) {
            console.log("props changed1")
            // if (props.audioRef && props.audioRef.current) {
            //     console.log("props changed2")
            //     props.audioRef.current.currentTime = 0;
            //   }
            // props.audioRef.current.currentTime = 0;
            if (props.audioRef?.current) {
                console.log("props changed3")
                props.audioRef?.current.play();
                setPlayBtn('on');
            }
        } else {
            console.log("props changed4")
            if (props.audioRef?.current) {
                console.log("props changed5")
                props.audioRef?.current.pause();
                setPlayBtn('off');
            }
        }
    }, [props?.isPlaying]);

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

