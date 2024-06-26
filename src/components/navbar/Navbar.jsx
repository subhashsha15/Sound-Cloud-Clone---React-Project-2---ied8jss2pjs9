import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../../public/images/logo.svg'
import message from '../../../public/images/message-icon.svg'
import notification from '../../../public/images/notification-icon.svg'
import more from '../../../public/images/more-icon.svg'
import downarrow from '../../../public/images/down-arrow.svg'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Message from '../messagesAndnotifications/Message';
import axios from 'axios';
import { headers } from '../../miscellaneous/miscellaneous';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import Alert from '../alert/Alert'
const Navbar = () => {
    const [openMoreOtions, setOpenMoreOptions] = useState(false);
    const [openMessageModal, setOpenMessageModal] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [isMenuIconOpen, setIsMenuIconOpen] = useState(false);
    const searchValueRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const username = localStorage.getItem('UserName');
    const handleMoreBtn = () => {
        setOpenMoreOptions(prev => !prev);
        setOpenMessageModal(false);
        setOpenNotificationModal(false);
        setOpenProfileModal(false);
    }
    const handleMessageModal = () => {
        setOpenMessageModal(prev => !prev);
        setOpenMoreOptions(false);
        setOpenNotificationModal(false);
        setOpenProfileModal(false);
    }
    const handleNotificationModal = () => {
        setOpenNotificationModal(prev => !prev);
        setOpenMoreOptions(false);
        setOpenMessageModal(false);
        setOpenProfileModal(false);
    }
    const handleProfile = () => {
        setOpenProfileModal(prev => !prev);
        setOpenNotificationModal(false);
        setOpenMoreOptions(false);
        setOpenMessageModal(false);
    }
    const handleLogout = () => {
        // localStorage.clear();
        localStorage.removeItem('UserName');
        navigate('/')
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
            if (openProfileModal) {
                setOpenProfileModal(false);
            }
        };

        // Add event listener when the component mounts
        if (openMoreOtions || openMessageModal || openNotificationModal || openProfileModal) {
            window.addEventListener('click', handleClick);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [openMoreOtions, openMessageModal, openNotificationModal, openProfileModal]);

    const navigate = useNavigate();
    const handleSearch = () => {
        let searchValue = "";
        let totalresults = "";
        if (searchValueRef.current) {
            searchValue = searchValueRef.current.value;
        }
        navigate(`/searchresult?query=${searchValue}&totalresults=0`);
        axios.get(`https://academics.newtonschool.co/api/v1/music/song?limit=100&filter={"mood":"${searchValue}"}`, { headers })
            .then((response) => {
                const data = response.data.data;
                console.log("from navbar searchresults", data)
                totalresults = data.length,
                    navigate(`/searchresult?query=${searchValue}&totalresults=${totalresults}`);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#111" : "",
            textDecoration: isActive ? "none" : "none",
        };
    };
    const handleNavbarMenuIcon = () => {
        setIsMenuIconOpen(prev => !prev);
    }
    const newPageMessage = (e, value) => {
        e.preventDefault();
        setOpen(true);
        switch (value) {
            case "Feed": return setLink("https://soundcloud.com/feed");
            case "Try Next Pro": return setLink("https://checkout.soundcloud.com/artist?ref=t353");
            case "For Artists": return setLink("https://artists.soundcloud.com/overview");
            case "Upload": return setLink("https://soundcloud.com/upload");
        }
    }


    const handleClickOpen = () => {
        setOpen(false);
        window.open(link, '_blank');
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="navbar">
                <Alert open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
                <div className="navbar-container">
                    <div className="navbar-left">
                        <div className="logo-image">
                            <img src={logo} alt="" />
                        </div>
                        <div className="navbar-left-items">
                            <ul>
                                <NavLink to="/home" style={navLinkStyles}>
                                    <li>Home</li>
                                </NavLink>
                                <NavLink to="/comingsoon" style={navLinkStyles}>
                                    {/* <li>Feed</li> */}
                                </NavLink>
                                <li className="feed-link" onClick={(e) => newPageMessage(e, "Feed")}>
                                    <a href="#">
                                        Feed
                                    </a>
                                </li>
                                <NavLink to="/library" style={navLinkStyles}>
                                    <li>Library</li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-middle">
                        <input type="text" placeholder='Search' ref={searchValueRef} />
                        <div className="search-icon" onClick={handleSearch}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="navbar-right">
                        <button className='special-btn' onClick={(e) => newPageMessage(e, "Try Next Pro")}>
                            <a href="#">Try Next Pro</a>
                        </button>
                        <button className='special-artist-btn' onClick={(e) => newPageMessage(e, "For Artists")}>
                            <a href="#">For Artists</a>
                        </button>
                        <button className='special-btn' onClick={(e) => newPageMessage(e, "Upload")}>
                            <a href="#">Upload</a>
                        </button>
                        <div className="navbar-profile" onClick={handleProfile}>
                            <span>{username?.charAt(0).toUpperCase()}</span>
                            <img src={downarrow} alt="" />
                        </div>
                        {openProfileModal && (<>
                            <div className="profile-modal">
                                <ul onClick={handleLogout}>
                                    <li>Logout</li>
                                </ul>
                            </div>
                        </>)}
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
                                </ul>
                            </div>
                        </>)}
                        <div className="navbar-icon" onClick={handleNavbarMenuIcon}>
                            {isMenuIconOpen ? <CloseIcon /> : <MenuIcon color="inherit" />}
                        </div>
                        {isMenuIconOpen && (<ul class="navbar-menu_list">
                            <Link to="/home" className="link">
                                <li>Home</li>
                            </Link>
                            <Link to="/signup" className="link">
                                <li>Feed</li>
                            </Link>
                            <Link to="/library" className="link">
                                <li>Library</li>
                            </Link>
                            <Link to="/comingsoon" className="link">
                                <li>Try Next Pro</li>
                            </Link>
                            <Link to="/comingsoon" className="link">
                                <li>For Artists</li>
                            </Link>
                            <Link to="/comingsoon" className="link">
                                <li>Upload</li>
                            </Link>
                        </ul>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;