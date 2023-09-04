import React, { useEffect, useState } from "react"
import "./Home.css"
import Slide from "../../components/slider/Slider";
import SongCard from "../../components/songcard/SongCard";
import axios from 'axios';
import Loader from "../../components/loader/Loader";
import { useDispatch,useSelector} from "react-redux";
const Home = () => {
    console.log("home re-render");
    const [songData, setSongData] = useState([]);
    const [loading, setLoading] = useState(true);

    const headers = {
        'projectId': 'ied8jss2pjs9',
    };

    useEffect(() => {
        axios.get('https://academics.newtonschool.co/api/v1/music/album', { headers })
            .then((response) => {
                const data = response.data.data;
                setSongData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
  
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