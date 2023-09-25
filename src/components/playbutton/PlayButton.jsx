import React, { useState, useRef, useEffect } from "react";
import './PlayButton.css';
import playImg from '../../../public/images/playbutton-img.svg'
import PauseIcon from '@material-ui/icons/Pause';
const PlayButton = (props) => {
    console.log("PlayButton props", props);
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const audioRef1 = useRef(null);
    const [playBtn, setPlayBtn] = useState("off");

    useEffect(() => {
        const audio = audioRef1.current || props?.audioRef?.current;
        if (isSongPlaying || props.isPlaying) {
            console.log("inside if")
            if (audio.src !== props.audio_url) {
                audio.pause();
                audio.src = props.audio_url;
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
    }, [isSongPlaying, props.audio_url, props.isPlaying]);


    const handlePlayPause = () => {
        console.log("sdafhsafs")
        setIsSongPlaying(!isSongPlaying);
        if (props.setIsPlaying) {
            props.setIsPlaying(!props.isPlaying);
        }
        console.log(props.isPlaying);
        console.log(playBtn);
    };
    // ###########################################################
    // useEffect(() => {
    //     const audio = audioRef1.current || props?.audioRef?.current;

    //     // Check if audio is not null and audio_url has changed
    //     if (audio && audio.src !== props.audio_url) {
    //         audio.pause();
    //         audio.src = props.audio_url;

    //         // Listen for the 'canplaythrough' event to ensure the audio is loaded
    //         audio.addEventListener('canplaythrough', () => {
    //             const playPromise = audio.play();

    //             if (playPromise !== undefined) {
    //                 playPromise
    //                     .then(() => {
    //                         // Audio started playing successfully
    //                         setPlayBtn('on');
    //                     })
    //                     .catch((error) => {
    //                         // Handle the error (e.g., autoplay policy prevented playback)
    //                         console.error("Play error:", error);
    //                     });
    //             }
    //         });

    //         // Listen for errors
    //         audio.addEventListener('error', (event) => {
    //             console.error('Audio error:', event);
    //         });
    //     } else if (audio && isSongPlaying) {
    //         // If audio is already loaded and isSongPlaying is true
    //         const playPromise = audio.play();

    //         if (playPromise !== undefined) {
    //             playPromise
    //                 .then(() => {
    //                     // Audio started playing successfully
    //                     setPlayBtn('on');
    //                 })
    //                 .catch((error) => {
    //                     // Handle the error (e.g., autoplay policy prevented playback)
    //                     console.error("Play error:", error);
    //                 });
    //         }
    //     } else {
    //         audio.pause();
    //         audio.src = '';
    //         setPlayBtn('off');
    //     }
    // }, [isSongPlaying, props.audio_url, props.isPlaying]);
    // ###########################################################

    // *********************************
    // const handlePlayPause = () => {
    //     console.log("PlayButton props inside of handleplay/pause", props);
    //     console.log("search_______")
    //     // setIsPlaying(!isSongPlaying);
    //     if (props?.isPlaying || props?.isPlayingSongCard) {
    //         props.setIsPlaying ? props.setIsPlaying(!props.isPlaying) : props.setIsPlayingSongCard(!props.isPlayingSongCard);
    //     }
    //     else {
    //         setIsPlaying(!isSongPlaying);
    //     }
    //     if (isSongPlaying) {
    //         if (audioRef1?.current) {
    //             // if (props.isPlayingSongCard || isSongPlaying) {
    //             //     props.audioRef.current.src = props.audio_url
    //             // }
    //             audioRef1?.current.play();
    //             setPlayBtn('on');
    //         }
    //     } else {
    //         if (audioRef1?.current) {
    //             audioRef1?.current.pause();
    //             setPlayBtn('off');
    //         }
    //     }
    // }
    // useEffect(() => {
    //     console.log("useeffect")
    //     console.log("PlayButton props.isPlayingSongCard", props.isPlayingSongCard);
    //     console.log("PlayButton props.isPlaying", props.isPlaying);
    //     if (props?.isPlaying || props.isPlayingSongCard || isSongPlaying) {
    //         console.log("inside of Useeffect if part");
    //         console.log("inside of Useeffect if part audioRef value=", props.audioRef?.current);
    //         if (props.audioRef?.current || audioRef1.current) {
    //             console.log("inside of Useeffect if audioRef?.current(true)===", props.audioRef?.current.src);
    //             if (props.isPlaying || props.isPlayingSongCard || props.audioRef?.current) {
    //                 props.audioRef.current.src = props.audio_url
    //             }
    //             setPlayBtn('on');
    //             audioRef1.current ? audioRef1.current?.play() : props.audioRef.current?.play()
    //         }
    //     } else {
    //         console.log("inside of Useeffect else part");
    //         if (props.audioRef?.current || audioRef1.current) {
    //             console.log("inside of Useeffect if audioRef?.current(false)===", props.audioRef?.current.src);
    //             // props.audioRef?.current.pause();
    //             audioRef1.current ? audioRef1.current?.pause() : props.audioRef.current?.pause();
    //             props.audioRef.current.src = '';
    //             setPlayBtn('off');
    //         }
    //     }
    // }, [props.audioRef, props.isPlaying, props.isPlayingSongCard, isSongPlaying, props.audio_url]);
    // console.log("isSongPlaying", isSongPlaying)
    return (
        <>
            <div className="playbutton" onClick={handlePlayPause}>
                {playBtn == "off" ? <img src={playImg} alt="" /> : <div className="pausebtn"><PauseIcon fontSize="large" /></div>}
                <audio ref={audioRef1} src={props.audioUrl || props.audio_url || props.props} ></audio>
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

