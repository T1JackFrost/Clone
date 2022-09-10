import { useRef, useState } from 'react';
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

import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function Playbar() {
    const [state, dispatch] = useStore();
    const { title, artistsNames, thumbnailM, isPlay, srcAudio, duration, currentTime } = state;

    const audioRef = useRef();
    const rangeRef = useRef();

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

    const handleProgress = () => {
        if (audioRef.current.duration) {
            rangeRef.current.value = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100);
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
                    <Button className={cx('control-btn', 'random-btn')} type="circle">
                        <FontAwesomeIcon icon={faShuffle} />
                    </Button>
                    <Button className={cx('control-btn')} type="circle">
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </Button>
                    <Button className={cx('control-btn', 'play-btn')} type="circle" onClick={handlePlaySong}>
                        {isPlay ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faPlayCircle} />}
                    </Button>
                    <Button className={cx('control-btn')} type="circle">
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button className={cx('control-btn', 'loop-btn')} type="circle">
                        <FontAwesomeIcon icon={faRepeat} />
                    </Button>
                </div>
                <div className={cx('song-range')}>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        ref={rangeRef}
                        onInput={handleProgress}
                    />
                </div>
            </div>
            <div className={cx('player-option')}>
                <div className={cx('volume')}>
                    <Button className={cx('option-btn')} type="primary">
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </Button>
                    <div className={cx('volume-range')}>
                        <input type="range" min="0" max="100" />
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={srcAudio} />
        </div>
    );
}

export default Playbar;
