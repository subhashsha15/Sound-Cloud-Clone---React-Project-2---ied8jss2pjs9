import React, { useState } from "react";
import './Library.css'
import { NavLink } from 'react-router-dom';
import { Route, Routes, Link } from 'react-router-dom';
import Likes from "./likes/Likes";
import Playlists from "./playlists/Playlists";
import Albums from "./albums/Albums";
import Following from "./following/Following";
const Library = () => {
    const [libraryItems, setLibraryItems] = useState({
        likes: true,
        playlists: false,
        albums: false,
        following: false
    })
    const { likes, playlists, albums, following } = libraryItems;
    const handleLibraryItems = (event) => {
        const value = event.target.id;
        const updatedLibraryItems = Object.keys(libraryItems).reduce((result, key) => {
            result[key] = key === value;
            return result;
        }, {});
        setLibraryItems(updatedLibraryItems);
    }

    return (
        <>
            <div className="library">
                <div className="library-container">
                    <div className="library-container-top" onClick={handleLibraryItems}>
                        <span id="likes" className={likes ? "active" : ""}>Likes</span>
                        <span id="playlists" className={playlists ? "active" : ""}>Playlists</span>
                        <span id="albums" className={albums ? "active" : ""}>Albums</span>
                        <span id="following" className={following ? "active" : ""}>Following</span>
                    </div>
                    <div className="library-container-middle">
                        {
                            likes ? (<Likes />) : playlists ? (<Playlists />) : albums ? (<Albums />) : (<Following />)
                        }
                    </div>
                    <div className="library-container-bottom"></div>
                </div>
            </div>
        </>
    )
}

export default Library;