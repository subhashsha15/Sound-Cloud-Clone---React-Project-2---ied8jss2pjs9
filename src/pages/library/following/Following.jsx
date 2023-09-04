import React from "react";
import './Following.css'
import { ArtistsContext } from "../../../components/App"; 
import { useContext } from "react";
const Following = () => {
    const { followingArtistsRef } = useContext(ArtistsContext);
    console.log("following component=",followingArtistsRef);
    return (
        <>
            <div className="following">Following</div>
        </>
    )
}
export default Following;