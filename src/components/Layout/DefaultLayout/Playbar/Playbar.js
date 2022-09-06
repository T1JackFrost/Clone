import { useState } from 'react';
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
const cx = classNames.bind(styles);

function Playbar() {
    const [isPlay, setIsPlay] = useState(true);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('player-info')}>
                <img className={cx('img')} />
                <div className={cx('name')}>
                    <h3 className={cx('title')}></h3>
                    <p className={cx('artist')}></p>
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
                    <Button className={cx('control-btn', 'play-btn')} type="circle" onClick={() => setIsPlay(!isPlay)}>
                        {isPlay ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faPlayCircle} />}
                    </Button>
                    <Button className={cx('control-btn')} type="circle">
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button className={cx('control-btn', 'loop-btn')} type="circle">
                        <FontAwesomeIcon icon={faRepeat} />
                    </Button>
                </div>
                <div className={cx('range')}></div>
            </div>
            <div className={cx('player-option')}>
                <div className={cx('volume')}>
                    <Button className={cx('option-btn')} type="primary">
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Playbar;
