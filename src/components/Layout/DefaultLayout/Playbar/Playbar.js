import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShuffle,
    faBackwardStep,
    faForwardStep,
    faPlayCircle,
    faPauseCircle,
    faRepeat,
    faVolumeHigh,
    faExpand,
    faCompress,
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Playbar.module.scss';
import request from '~/ultis/request';

import { useStore, actions } from '~/store';
import ProgressBar from './ProgressBar';

const cx = classNames.bind(styles);

function Playbar() {
    const [state, dispatch] = useStore();
    const { songId, title, artistsNames, thumbnailM, isPlay, srcAudio, duration, volume, isLoop, isRandom, albumSong } =
        state;

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (srcAudio) {
            audioRef.current.play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [srcAudio]);

    useEffect(() => {
        dispatch(actions.setPlaySong(false));
        if (!songId) {
            return;
        }

        request.get(`/song?id=${songId}`).then((res) => {
            if (res?.data) {
                dispatch(actions.setSrcAudio(res.data?.['128']));
                dispatch(actions.updateHistory({ songId, title, artistsNames, srcAudio, thumbnailM, duration }));
                dispatch(actions.setPlaySong(true));
                audioRef.current.play();
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId]);

    const audioRef = useRef();
    const rangeRef = useRef();
    const volumeRef = useRef();

    const handlePlaySong = () => {
        if (isPlay) {
            dispatch(actions.setPlaySong(false));
            if (audioRef) {
                audioRef.current.pause();
            }
        } else {
            dispatch(actions.setPlaySong(true));
            audioRef.current.play();
        }
    };

    const handleChangeProgress = (e) => {
        audioRef.current.currentTime = (audioRef.current.duration / duration) * e.target.value;
    };

    const handleVolume = () => {
        dispatch(actions.setVolume(volumeRef.current.value));
        audioRef.current.volume = volumeRef.current.value / 100;
    };

    const handleLoop = () => {
        dispatch(actions.setLoop(!isLoop));
    };

    const handleLoadSong = (song) => {
        dispatch(
            actions.setSongInfo({
                title: song?.title,
                artistsNames: song?.artistsNames,
                thumbnailM: song?.thumbnailM,
            }),
        );
        dispatch(
            actions.setSongSelect({
                songId: song?.encodeId,
                duration: song?.duration,
            }),
        );
    };

    const getCurrentSong = () => {
        const songIndex = albumSong.findIndex((song) => song.encodeId === songId);
        return {
            encodeId: songId,
            songIndex: songIndex,
            duration: duration,
            title: title,
            artistsNames: artistsNames,
            thumbnailM: thumbnailM,
        };
    };

    const handleRandom = () => {
        if (albumSong.length >= 2) {
            let newSong;
            do {
                newSong = albumSong[Math.floor(Math.random() * albumSong.length)];
            } while (newSong.encodeId === songId);
            handleLoadSong(newSong);
        }
    };

    const handleNextSong = () => {
        if (isRandom) {
            handleRandom();
        } else {
            const song = getCurrentSong();
            let nextSongIndex = song.songIndex + 1;
            if (nextSongIndex >= albumSong.length) {
                nextSongIndex = 0;
            }
            const nextSong = albumSong[nextSongIndex];
            handleLoadSong(nextSong);
        }
    };

    const handlePrevSong = () => {
        if (isRandom) {
            handleRandom();
        } else {
            const song = getCurrentSong();
            let prevSongIndex = song.songIndex - 1;
            if (prevSongIndex < 0) {
                prevSongIndex = albumSong.length - 1;
            }
            const prevSong = albumSong[prevSongIndex];
            handleLoadSong(prevSong);
        }
    };

    const handleOnEnd = () => {
        if (!isLoop) {
            handleNextSong();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('player-info')}>
                <img className={cx('img')} src={thumbnailM} alt={thumbnailM} />
                <div className={cx('name')}>
                    <h3 className={cx('title')}>{title}</h3>
                    <p className={cx('artist')}>{artistsNames}</p>
                </div>
            </div>
            <div className={cx('player-control')}>
                <div className={cx('handler')}>
                    <Button
                        className={cx('random-btn', isRandom && 'btn-active')}
                        type="circle"
                        onClick={() => {
                            dispatch(actions.setRandom(!isRandom));
                        }}
                    >
                        <FontAwesomeIcon icon={faShuffle} />
                    </Button>
                    <Button className={cx('backward-btn')} type="circle" onClick={handlePrevSong}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </Button>
                    <Button className={cx('play-btn')} type="circle" onClick={handlePlaySong}>
                        {isPlay ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faPlayCircle} />}
                    </Button>
                    <Button className={cx('forward-btn')} type="circle" onClick={handleNextSong}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button className={cx('loop-btn', isLoop && 'btn-active')} type="circle" onClick={handleLoop}>
                        <FontAwesomeIcon icon={faRepeat} className={cx('loop-icon')} />
                    </Button>
                </div>
                <ProgressBar
                    currentTime={currentTime}
                    rangeRef={rangeRef}
                    onInput={(e) => handleChangeProgress(e)}
                    duration={duration}
                />
            </div>
            <div className={cx('player-option')}>
                <div className={cx('volume')}>
                    <Button className={cx('option-btn')} type="primary">
                        {volume === '0' ? (
                            <FontAwesomeIcon icon={faVolumeMute} />
                        ) : (
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        )}
                    </Button>
                    <div className={cx('volume-range')}>
                        <input ref={volumeRef} type="range" min="0" max="100" value={volume} onChange={handleVolume} />
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={srcAudio}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                loop={isLoop}
                onEnded={handleOnEnd}
            />
        </div>
    );
}

export default Playbar;
