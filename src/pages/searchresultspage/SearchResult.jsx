import React from "react";
import './SearchResult.css'
import SongCard from "../../components/songcard/SongCard";
import { useParams } from 'react-router-dom';
const SearchResult = () => {
    const searchResults = JSON.parse(localStorage.getItem('SearchResults'));
    console.log("searchResults", searchResults);
    const { searchvalue } = useParams();
    return (
        <>
            <div className="searchResult">
                <div className="searchResult-container">
                    <div className="searchResult-heading">
                        Search results for “{searchvalue}”<br />
                    </div>
                    <p>Found {searchResults?.length} playlists</p>
                    <div className="searchResult-content">
                        {
                            searchResults?.filter((items) => items.album).map((items) => (<SongCard items={items} key={items._id} />))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchResult;