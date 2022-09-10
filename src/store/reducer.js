import { SET_SRC_AUDIO, SET_SONG_INFO, SET_SONG_SELECT, SET_PLAY_SONG } from './constants';

const initState = {
    isPlay: false,
    isMute: false,
    songId: '',
    playlistId: '',
    currentIndexSong: 0,
    currentIndexSongRandom: 0,
    title: '',
    artistsNames: '',
    thumbnailM: '',
    srcAudio: '',
    currentTime: 0,
    duration: 0,
    volume: 0,
    isLoop: false,
    isRandom: false,
    autoPlay: false,
};

function reducer(state, action) {
    console.log(action.payload);
    switch (action.type) {
        case SET_SRC_AUDIO:
            return {
                ...state,
                srcAudio: action.payload,
            };
        case SET_SONG_INFO:
            return {
                ...state,
                title: action.payload.title,
                artistsNames: action.payload.artistsNames,
                thumbnailM: action.payload.thumbnailM,
            };
        case SET_SONG_SELECT:
            return {
                ...state,
                songId: action.payload.songId,
                duration: action.payload.duration,
            };
        case SET_PLAY_SONG:
            return {
                ...state,
                isPlay: action.payload,
            };
        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
