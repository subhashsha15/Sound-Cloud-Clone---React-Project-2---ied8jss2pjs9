// import { useSelector } from "react-redux/es/hooks/useSelector";
// const songLists = localStorage.getItem('persist:persist-store');
// const songList1 = JSON.parse(songLists)
// console.log("songlist from listingreducer",songList1.initialState.songList);
const songsDetails=localStorage.getItem('Songs_Lists')
const initialState = {
    songList:[],
    loading: true
}

const updateSongListing = (state = initialState, action) => {
    switch (action.type) {
        case "SONGS_LISTING":
            return {
                ...state,
                songList: action.payload
            }
        case "Loading": return {
            ...state,
            loading: action.payload
        }
        default:
            return {
                initialState
            }
    }

}
export default updateSongListing;