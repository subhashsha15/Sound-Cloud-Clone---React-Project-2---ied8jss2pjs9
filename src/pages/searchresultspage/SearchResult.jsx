import React, { useEffect, useState } from "react";
import './SearchResult.css'
import SongCard from "../../components/songcard/SongCard";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
const SearchResult = () => {
    const [pageClicked, setPageClicked] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const totalresults = searchParams.get('totalresults');

    const limit = 20;
    let totalPages = 0;
    const headers = {
        'projectId': 'ied8jss2pjs9',
    };
    useEffect(() => {
        totalPages = Math.ceil(totalresults / Number(limit));
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        setNumberOfPages(pages);
    }, [totalresults])

    useEffect(() => {
        setLoading(true);
        axios.get(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${query}"}&page=${pageClicked}&limit=${limit}`, { headers })
            .then((response) => {
                const data = response.data.data;
                setSearchResults(data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [pageClicked, query])

    const handlePageClick = (event) => {
        const value = event.target.innerHTML;
        setPageClicked(value)
    }

    return (
        <>
            <div className="searchResult">
                <div className="searchResult-container">
                    <div className="searchResult-heading">
                        Search results for “{query}”<br />
                    </div>
                    <p>Found {totalresults} playlists</p>
                    {loading ? (<div className="loader-content">
                        <Loader />
                    </div>) :
                        (<div className="searchResult-content">
                            {
                                searchResults?.filter((items) => items.album).map((items) => (<SongCard items={items} key={items._id} />))
                            }
                        </div>)}
                    <div className="searchResult-pages" onClick={handlePageClick}>
                        {
                            numberOfPages?.map((item) => (<div className={item == pageClicked ? "page-number page-active" : "page-number"}>{item}</div>))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchResult;