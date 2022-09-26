import {
    SET_SRC_AUDIO,
    SET_SONG_INFO,
    SET_SONG_SELECT,
    SET_PLAY_SONG,
    SET_VOLUME,
    SET_LOOP,
    SET_ALBUM,
    UPDATE_HISTORY,
} from './constants';

export const setSrcAudio = (payload) => ({
    type: SET_SRC_AUDIO,
    payload,
});

export const setSongInfo = (payload) => ({
    type: SET_SONG_INFO,
    payload,
});

export const setSongSelect = (payload) => ({
    type: SET_SONG_SELECT,
    payload,
});

export const setPlaySong = (payload) => ({
    type: SET_PLAY_SONG,
    payload,
});

export const setVolume = (payload) => ({
    type: SET_VOLUME,
    payload,
});

export const setLoop = (payload) => ({
    type: SET_LOOP,
    payload,
});

export const setAlbum = (payload) => ({
    type: SET_ALBUM,
    payload,
});

export const updateHistory = (payload) => ({
    type: UPDATE_HISTORY,
    payload,
});
