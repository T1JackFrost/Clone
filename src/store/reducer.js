import {
    SET_SRC_AUDIO,
    SET_SONG_INFO,
    SET_SONG_SELECT,
    SET_PLAY_SONG,
    SET_VOLUME,
    SET_LOOP,
    SET_ALBUM,
    UPDATE_HISTORY,
    SET_RANDOM,
} from './constants';

const initState = {
    isPlay: false,
    isMute: false,
    songId: '',
    playlistId: '',
    title: '',
    artistsNames: '',
    thumbnailM: '',
    srcAudio: '',
    duration: 0,
    volume: 20,
    isLoop: false,
    isRandom: false,
    autoPlay: false,
    album: {},
    albumSong: [],
    history: JSON.parse(localStorage.getItem('history')) || [],
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SRC_AUDIO:
            return {
                ...state,
                srcAudio: action.payload,
            };
        case SET_SONG_INFO: {
            const { title, artistsNames, thumbnailM } = action.payload;
            return {
                ...state,
                title,
                artistsNames,
                thumbnailM,
            };
        }
        case SET_SONG_SELECT: {
            const { songId, duration } = action.payload;
            return {
                ...state,
                songId,
                duration,
            };
        }
        case SET_PLAY_SONG:
            return {
                ...state,
                isPlay: action.payload,
            };
        case SET_VOLUME:
            return {
                ...state,
                volume: action.payload,
            };
        case SET_LOOP:
            return {
                ...state,
                isLoop: action.payload,
            };
        case SET_ALBUM:
            return {
                ...state,
                album: action.payload,
                albumSong: action.payload?.song?.items?.filter((item) => item.streamingStatus === 1),
            };
        case UPDATE_HISTORY: {
            const { songId } = action.payload;
            const checkId = state.history.filter((data) => {
                return data.songId !== songId;
            });

            if (checkId.length >= 10) {
                checkId.pop();
                checkId.unshift(action.payload);
            } else {
                checkId.unshift(action.payload);
            }

            localStorage.setItem('history', JSON.stringify(checkId));

            return {
                ...state,
                history: checkId,
            };
        }
        case SET_RANDOM:
            return {
                ...state,
                isRandom: action.payload,
            };
        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
