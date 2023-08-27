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