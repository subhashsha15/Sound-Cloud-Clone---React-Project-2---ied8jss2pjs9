import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './SongCard.css'
import PlayButton from "../playbutton/PlayButton";
import { useNavigate } from "react-router";
// const SongCard = ({ items, singlesong, toPath, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex, audioRef, index }) => {
const SongCard = ({ items, singlesong, toPath, isPlaying, setIsPlaying }) => {
    // console.log("singlesong from home", singlesong)
    const navigate = useNavigate();
    const handleOnCardClick = () => {
        // console.log("items from home", items)
        const CardId = items.album ? items.album : items._id;
        navigate(toPath || `/songs/${CardId}`);
    }
    // const isCurrentlyPlaying = currentSongIndex === index;
    return (
        <>
            <Card className="card" >
                <CardActionArea>
                    <CardMedia
                        className="media"
                        onClick={handleOnCardClick}
                        image={items.image || items.thumbnail}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="none" color="#333">
                            {items.title}
                        </Typography>
                        <Typography variant="body2">
                            {items.featured ? items.featured : items.mood}
                        </Typography>
                    </CardContent>
                    <PlayButton
                        audio_url={(singlesong && singlesong[0]?.audio_url) || items.songs ? items.songs[0]?.audio_url : items.audio_url}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </CardActionArea>
            </Card>
        </>
    )
}

export default SongCard;