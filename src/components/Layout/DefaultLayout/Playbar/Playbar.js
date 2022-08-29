import classNames from 'classnames/bind';
import styles from './Playbar.module.scss';
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

const cx = classNames.bind(styles);

function Playbar() {
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
                <div className={cx('handler')}></div>
                <div className={cx('range')}></div>
            </div>
            <div className={cx('player-option')}>
                <div className={cx('volume')}></div>
            </div>
        </div>
    );
}

export default Playbar;
