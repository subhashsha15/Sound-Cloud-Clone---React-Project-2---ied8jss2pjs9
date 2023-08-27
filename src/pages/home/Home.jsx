import React, { useEffect, useState } from "react"
import "./Home.css"
import Slide from "../../components/slider/Slider";
import SongCard from "../../components/songcard/SongCard";
import axios from 'axios';
import Loader from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
const Home = () => {
    const songsList = [];
    const [songData, setSongData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const headers = {
        'projectId': 'ied8jss2pjs9',
    };

    const songListingAction = {
        type: "SONGS_LISTING",
        payload: songsList,
    }

    useEffect(() => {
        axios.get('https://academics.newtonschool.co/api/v1/music/album', { headers })
            .then((response) => {
                const data = response.data.data;
                setSongData(data);
                setLoading(false);
                const songs = data.map((data) => data.songs);
                songs.forEach(element => {
                    element.forEach(element => songsList.push(element.mood));
                });
                console.log(songsList);
                
            })
            .catch((error) => {
                console.log(error.message);
            });
            console.log("home line 38");
            dispatch(songListingAction);
            setFlag(true);
    }, [flag]);
    console.log(songData);
    console.log(songsList);
  
    return (
        <>
            <div className="home">
                {loading ? (<Loader />) : (<div className="home-container">
                    <div className="home-container-left">
                        {
                            <Slide>
                                {
                                    songData.map((items) => <SongCard items={items} key={items._id} />)
                                }
                            </Slide>
                        }
                    </div>
                    <div className="home-container-right">
                        Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃ Artist Resources ⁃ Blog ⁃ Charts ⁃
                        Language: English (US)
                    </div>
                </div>)
                }
            </div >
        </>
    )
}

export default Home;