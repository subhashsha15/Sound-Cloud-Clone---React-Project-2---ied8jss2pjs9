import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../../public/images/logo.svg'
import message from '../../../public/images/message-icon.svg'
import notification from '../../../public/images/notification-icon.svg'
import more from '../../../public/images/more-icon.svg'
import downarrow from '../../../public/images/down-arrow.svg'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom';
import Message from '../messagesAndnotifications/Message';
import axios from 'axios';
const Navbar = () => {
    const [openMoreOtions, setOpenMoreOptions] = useState(false);
    const [openMessageModal, setOpenMessageModal] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);

    const handleMoreBtn = () => {
        setOpenMoreOptions(prev => !prev);
        setOpenMessageModal(false);
        setOpenNotificationModal(false);
    }
    const handleMessageModal = () => {
        setOpenMessageModal(prev => !prev);
        setOpenMoreOptions(false);
        setOpenNotificationModal(false);
    }
    const handleNotificationModal = () => {
        setOpenNotificationModal(prev => !prev);
        setOpenMoreOptions(false);
        setOpenMessageModal(false);
    }
    useEffect(() => {
        const handleClick = () => {
            if (openMoreOtions) {
                setOpenMoreOptions(false);
            }
            if (openMessageModal) {
                setOpenMessageModal(false);
            }
            if (openNotificationModal) {
                setOpenNotificationModal(false);
            }
        };

        // Add event listener when the component mounts
        if (openMoreOtions || openMessageModal || openNotificationModal) {
            window.addEventListener('click', handleClick);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [openMoreOtions, openMessageModal, openNotificationModal]);


    const headers = {
        'projectId': 'ied8jss2pjs9',
    };
    const handleSearch = (event) => {
        const searchValue=event.target.value;
        console.log(searchValue)
        axios.get(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${searchValue}"}`, { headers })
            .then((response) => {
                console.log("response", response.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    return (
        <>
            <div className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <div className="logo-image">
                            <img src={logo} alt="" />
                        </div>
                        <div className="navbar-left-items">
                            <ul>
                                <Link to="/home">
                                    <li>Home</li>
                                </Link>
                                <li>Feed</li>
                                <Link to="/songs">
                                    <li>Library</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-middle">
                        <input type="text" placeholder='Search' onChange={handleSearch}/>
                        <div className="search-icon" onClick={handleSearch}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="navbar-right">
                        <button>Try Next Pro</button>
                        <button>For Artists</button>
                        <Link to="/signup">
                            <button>Upload</button>
                        </Link>
                        <div className="navbar-profile">
                            <span>N</span>
                            <img src={downarrow} alt="" />
                        </div>
                        <img src={notification} alt="" onClick={handleNotificationModal} />
                        {openNotificationModal && (
                            <div className='notification-modal'>
                                <Message top="Notifications" middle="No notifications" bottom="View all notifications" />
                            </div>
                        )}
                        <img src={message} alt="" onClick={handleMessageModal} />
                        {openMessageModal && (
                            <div className='message-modal'>
                                <Message top="Messages" middle="No Messages" bottom="View all messages" />
                            </div>
                        )}
                        <img src={more} alt="" onClick={handleMoreBtn} />
                        {openMoreOtions && (<>
                            <div className="more-options">
                                <ul>
                                    <li>About us</li>
                                    <li>Legal</li>
                                    <li>Copyright</li>
                                    <li>Mobile apps</li>
                                    <li>For Creators</li>
                                    <li>Blog</li>
                                    <li>Jobs</li>
                                    <li>Developers</li>
                                    <li>Support</li>
                                    <li>Keyboard shortcuts</li>
                                    <li>Subscription</li>
                                    <li>Settings</li>
                                    <li>Sign out</li>
                                </ul>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;