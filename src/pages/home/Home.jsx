import React, { useEffect, useState } from "react"
import "./Home.css"
import Slide from "../../components/slider/Slider";
import SongCard from "../../components/songcard/SongCard";
import axios from 'axios';
import Loader from "../../components/loader/Loader";
import Footer from "../../components/footer/Footer";
import { headers } from "../../miscellaneous/miscellaneous";
const Home = () => {
    const [songData, setSongData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://academics.newtonschool.co/api/v1/music/album?sort={"release":-1}', { headers })
            .then((response) => {
                const data = response.data.data;
                console.log("from Home", data);
                setSongData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="home">
                {loading ? (<Loader />) : (<div className="home-container">
                    <div className="home-container-left">
                        <h1>Discover Tracks and Playlists</h1>
                        <div className="home-container-left-content-row1">
                            <div className="home-container-left-content-row-heading">Charts: Top 50</div>
                            <div className="home-container-left-content-row-description">The most played tracks on SoundCloud this week</div>
                            <div className="home-container-left-caraousel">
                                <Slide>
                                    {
                                        songData.filter((item) => item.songs.length > 0).slice(0, 20).map((items) => <SongCard items={items} key={items._id} singlesong={items.songs} />)
                                    }
                                </Slide>
                            </div>
                        </div>
                        <div className="home-container-left-content-row2">
                            <div className="home-container-left-content-row-heading">Charts: New & hot</div>
                            <div className="home-container-left-content-row-description">Up-and-coming tracks on SoundCloud</div>
                            <div className="home-container-left-caraousel">
                                <Slide>
                                    {
                                        songData.filter((item) => item.songs.length > 0).slice(20, 40).map((items) => <SongCard items={items} key={items._id} singlesong={items.songs} />)
                                    }
                                </Slide>
                            </div>
                        </div>
                        <div className="home-container-left-content-row3">
                            <div className="home-container-left-content-row-heading">Music Therapy</div>
                            <div className="home-container-left-caraousel">
                                <Slide>
                                    {
                                        songData.filter((item) => item.songs.length > 0).slice(40, 60).map((items) => <SongCard items={items} key={items._id} singlesong={items.songs} />)
                                    }
                                </Slide>
                            </div>
                        </div>
                        <div className="home-container-left-content-row4">
                            <div className="home-container-left-content-row-heading">Feel Good</div>
                            <div className="home-container-left-caraousel">

                                <Slide>
                                    {
                                        songData.filter((item) => item.songs.length > 0).slice(60, 80).map((items) => <SongCard items={items} key={items._id} singlesong={items.songs} />)
                                    }
                                </Slide>
                            </div>
                        </div>
                        <div className="home-container-left-content-row5">
                            <div className="home-container-left-content-row-heading">Chill</div>
                            <div className="home-container-left-caraousel">
                                <Slide>
                                    {
                                        songData.filter((item) => item.songs.length > 0).slice(80, 100).map((items) => <SongCard items={items} key={items._id} singlesong={items.songs} />)
                                    }
                                </Slide>
                            </div>
                        </div>
                    </div>
                    <div className="home-container-right">
                        <Footer fontsize={12} />
                    </div>
                </div>)
                }
            </div >
        </>
    )
}

export default Home;