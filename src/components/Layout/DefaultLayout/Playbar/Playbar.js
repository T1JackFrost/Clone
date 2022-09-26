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

const cx = classNames.bind(styles);

function Playbar() {
    const [state, dispatch] = useStore();
    const { songId, title, artistsNames, thumbnailM, isPlay, srcAudio, duration, volume, isLoop } = state;

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!songId) {
            return;
        }

        request.get(`/song?id=${songId}`).then((res) => {
            if (res?.data) {
                dispatch(actions.setSrcAudio(res.data?.['128']));
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
                    <Button className={cx('random-btn')} type="circle">
                        <FontAwesomeIcon icon={faShuffle} />
                    </Button>
                    <Button className={cx('backward-btn')} type="circle">
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </Button>
                    <Button className={cx('play-btn')} type="circle" onClick={handlePlaySong}>
                        {isPlay ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faPlayCircle} />}
                    </Button>
                    <Button className={cx('forward-btn')} type="circle">
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button className={cx('loop-btn', isLoop && 'loop-btn-active')} type="circle" onClick={handleLoop}>
                        <FontAwesomeIcon icon={faRepeat} className={cx('loop-icon')} />
                    </Button>
                </div>
                <div className={cx('song-range')}>
                    {duration ? (
                        <span className={cx('time')}>
                            {'0' + Math.floor(currentTime / 60)}:
                            {currentTime % 60 < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60)}
                        </span>
                    ) : (
                        ''
                    )}
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        ref={rangeRef}
                        onInput={(e) => handleChangeProgress(e)}
                    />
                    {duration ? (
                        <span className={cx('time')}>
                            {'0' + Math.floor(duration / 60)}:
                            {duration % 60 < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)}
                        </span>
                    ) : (
                        ''
                    )}
                </div>
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
            />
        </div>
    );
}

export default Playbar;
