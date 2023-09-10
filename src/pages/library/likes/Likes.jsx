import React, { useEffect, useState } from "react";
import './Likes.css'
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import PlayButton from "../../../components/playbutton/PlayButton";
import Loader from '../../../components/loader/Loader';
import { useNavigate } from "react-router";
import likeImg from '../../../../public/images/Likeimage.svg'
const Likes = () => {
    console.log("likes re-renders");
    const [likedSongs, setLikedSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const TOKEN = localStorage.getItem('Token');
    const navigate=useNavigate();
    const headers = {
        'Authorization': `Bearer ${TOKEN}`,
        'projectId': 'ied8jss2pjs9',
    };
    useEffect(() => {
        axios.get("https://academics.newtonschool.co/api/v1/music/favorites/like", { headers })
            .then((response) => {
                setLikedSongs(response.data.data.songs);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);

    const handlePlayBtnClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <div className="likes">
                <div className="likes-heading">
                    Hear the tracks you’ve liked:
                </div>
                {
                    loading ? (<Loader />) : (
                        <div className="likes-content">
                            {
                                likedSongs?.map((item) => (
                                    <>
                                        <div className="likes-details" onClick={()=>navigate(`/songs/${item.album}`)}>
                                            <div className="likes-image">
                                                <img src={item.thumbnail} alt="" />
                                            </div>
                                            <div>
                                                <img src={likeImg} alt="" />
                                                <span>{item.title}</span>
                                            </div>
                                            <div>{item.featured ? item.featured : item.mood}</div>
                                            <div className="likedSong-playBtn" onClick={handlePlayBtnClick}>
                                                <PlayButton audio_url={item.audio_url} />
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    )
                }
                <div className="likes-footer">
                    <Footer fontsize={14} />
                </div>
            </div >
        </>
    )
}
export default Likes;