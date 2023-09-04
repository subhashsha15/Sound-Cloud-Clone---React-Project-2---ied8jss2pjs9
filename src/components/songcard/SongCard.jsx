import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './SongCard.css'

import PlayButton from "../playbutton/PlayButton";
import { useNavigate } from "react-router";
const SongCard = ({ items }) => {
    // console.log("props",props);
    // console.log("items",items);
    const navigate = useNavigate();
    const handleOnCardClick = () => {
        const CardId = items.album?items.album:items._id;
        navigate(`/songs/${CardId}`);
        console.log(CardId);
    }

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
                            { items.mood}
                        </Typography>
                    </CardContent>
                    <PlayButton />
                </CardActionArea>
            </Card>
        </>
    )
}

export default SongCard;