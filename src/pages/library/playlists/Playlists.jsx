import React from "react";
import './Playlists.css';
import Footer from "../../../components/footer/Footer";
import PlayButton from "../../../components/playbutton/PlayButton";
import { useNavigate } from "react-router";
import likeImg from '../../../../public/images/Likeimage.svg'
const Playlists = () => {
    const PlayList = JSON.parse(localStorage.getItem('Playlist'));
    const navigate=useNavigate();
    const handlePlayBtnClick = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <div className="playlist">
                <div className="playlist-heading">
                    Hear your own playlists and the playlists you’ve liked:
                </div>
                <div className="playlist-content">
                    {
                        PlayList?.map((item) => (
                            <>
                                <div className="playlist-details" onClick={()=>navigate(`/songs/${item.album}`)}>
                                    <div className="playlist-image">
                                        <img src={item.thumbnail} alt="" />
                                    </div>
                                    <div>
                                        <img src={likeImg} alt="" />
                                        <span>{item.title}</span>
                                    </div>
                                    <div>{item.mood}</div>
                                    <div className="playlistSong-playBtn" onClick={handlePlayBtnClick}>
                                        <PlayButton audio_url={item.audio_url} />
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className="playlist-footer">
                    <Footer fontsize={14} />
                </div>
            </div>
        </>
    )
}
export default Playlists;