import React, { useState, useRef, useEffect } from "react";
import './PlayButton.css';
import playImg from '../../../public/images/playbutton-img.svg'
import PauseIcon from '@material-ui/icons/Pause';
const PlayButton = (props) => {
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const audioRef1 = useRef(null);
    const [playBtn, setPlayBtn] = useState("off");
    useEffect(() => {
        const audio = audioRef1.current || props?.audioRef?.current;
        if (isSongPlaying) {
            if (audio.src !== props.audio_url || props.audioUrl) {
                audio.pause();
                audio.src = props.audio_url || props.audioUrl;
                audio.load();
            }

            const playPromise = audio.play();
            // setPlayBtn('on');
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Audio started playing successfully');
                        setPlayBtn('on');
                    })
                    .catch((error) => {
                        console.error("Play error:", error);
                    });
            }

        } else {
            audio.pause();
            audio.src = '';
            setPlayBtn('off');
        }
    }, [isSongPlaying]);

    useEffect(() => {
        if(props.isPlaying){
            setPlayBtn("on");
        }
        else{
            setPlayBtn("off");
        }
    }, [props.isPlaying]);

    const handlePlayPause = () => {
        if(props.disable){
            return;
        }
        setIsSongPlaying(!isSongPlaying);
        if (props.setIsPlaying) {
            props.setIsPlaying(!props.isPlaying);
        }
    };

    return (
        <>
            <div className="playbutton" onClick={handlePlayPause}>
                {playBtn == "off" ? <img src={playImg} alt="" /> : <div className="pausebtn"><PauseIcon fontSize="large" /></div>}
                <audio ref={audioRef1 || props?.audioRef} src={props.audioUrl || props.audio_url || props.props} ></audio>
                {/* {
                    props.audioRef ? (<audio ref={props.audioRef} src={props.audioUrl || props.audio_url || props.props} ></audio>) : (
                        <audio ref={audioRef1} src={props.audioUrl || props.audio_url || props.props} ></audio>
                    )
                } */}
            </div>
        </>
    )
}

export default PlayButton;

