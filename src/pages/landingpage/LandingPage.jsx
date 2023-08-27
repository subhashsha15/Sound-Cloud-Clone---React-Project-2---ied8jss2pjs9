import React, { useState, useEffect, useRef } from "react";
import './LandingPage.css';
import LandingPageImage2 from '../../../public/images/Landingpage-img2.jpg'
import logo from '../../../public/images/logo.png'
import logo1 from '../../../public/images/logo.svg'
import AppleStore from '../../../public/images/app-store.png'
import GoogleStore from '../../../public/images/google-store.png'
import SearchIcon from '@material-ui/icons/Search';
import SongCard from "../../components/songcard/SongCard";
import axios from "axios";
import { Link } from "react-router-dom";
const LandingPage = () => {
    const [songs, setSongs] = useState([]);
    const headers = {
        'projectId': 'ied8jss2pjs9',
    };
    useEffect(() => {
        axios.get('https://academics.newtonschool.co/api/v1/music/album', { headers })
            .then((response) => {
                setSongs(response.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
    // console.log(songs)

    const handleSignUp=(event)=>{
        const value=event.target.name;
         if(value=="LogIn"){
            localStorage.setItem('user',"oldUser");
        }
        else{
             localStorage.setItem('user',"newUser");
         }
    }
    return (
        <>
            <div className="landingpage">
                <div className="landingpage-container">
                    <div className="landingpage-container-top">
                        <div className="landingpage-container-top-body1">
                            <div className="landingpage-container-top-body1-header">
                                <div className="landingpage-container-top-body1-header-left">
                                    <span>
                                        <img src={logo1} alt="" />
                                    </span>
                                    <span>
                                        <img src={logo} alt="" />
                                    </span>
                                </div>
                                <div className="landingpage-container-top-body1-header-right">
                                    <Link to="/signup">
                                        <button className="signin-btn" name="LogIn" onClick={handleSignUp}>Sign in</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="create-account-btn" name="CreateAccount" onClick={handleSignUp}>Create account</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="artist-btn">For Artists</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="landingpage-container-top-body1-content">
                                <h2>Connect on SoundCloud</h2>
                                <p>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
                                <Link to="/signup">
                                    <button name="LogIn" onClick={handleSignUp}>Sign up for free</button>
                                </Link>
                            </div>
                        </div>
                        <div className="landingpage-container-top-body2">
                            <div className="landingpage-container-top-body2-left">
                                <input type="text" placeholder="Search for artists, bands, tracks, podcasts" />
                                <div className="landingpage-container-top-body2-left-search-icon">
                                    <SearchIcon />
                                </div>
                            </div>
                            <div className="landingpage-container-top-body2-middle">
                                or
                            </div>
                            <div className="landingpage-container-top-body2-right">
                                <button className="landing-uploadbtn">Upload your own</button>
                            </div>
                        </div>
                        <div className="landingpage-container-top-body3">
                            <h3>Hear what’s trending for free in the SoundCloud community</h3>
                            <div className="songs">
                                {
                                    songs.map((items) => <SongCard items={items} key={items._id} />).slice(0, 12)
                                }
                            </div>
                            <Link to="/home">
                                <button className="landing-uploadbtn playlist-btn">Explore trending playlists</button>
                            </Link>
                        </div>
                    </div>
                    <div className="landingpage-container-middle">
                        <div className="landingpage-container-middle-left">
                            <img src={LandingPageImage2} alt="" />
                        </div>
                        <div className="landingpage-container-middle-right">
                            <h2>Never stop listening</h2>
                            <p>SoundCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</p>
                            <div className="stores">
                                <a href="https://apps.apple.com/us/app/soundcloud/id336353151"><img src={AppleStore} alt="" /></a>
                                <a href="https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us"><img src={GoogleStore} alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="landingpage-container-bottom">
                        <div className="landingpage-container-bottom-bodyTop">
                            <h2>Calling all creators</h2>
                            <p>Get on SoundCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>
                            <button>Find out more</button>
                        </div>
                        <div className="landingpage-container-bottom-bodyMiddle">
                            <h3>Thanks for listening. Now join in.</h3>
                            <p>Save tracks, follow artists and build playlists. All for free.</p>
                            <Link to="/signup">
                                <button className="playlist-btn" name="CreateAccount" onClick={handleSignUp}>Create account</button>
                            </Link>
                            <div className="account">
                                <p>Already have an account?</p>
                                <Link to="/signup">
                                    <button name="LogIn" onClick={handleSignUp}>Sign in</button>
                                </Link>
                            </div>
                        </div>
                        <div className="landingpage-container-bottom-bodyBottom">
                            <p>Directory ⁃ About us ⁃ Artist Resources ⁃ Blog ⁃ Jobs ⁃ Developers ⁃ Help ⁃ Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Consent Manager ⁃ Imprint ⁃ Charts
                                <br />
                                <span> Language:</span> <span>English (US)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;