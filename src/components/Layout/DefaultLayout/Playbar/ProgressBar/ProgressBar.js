import classNames from 'classnames/bind';
import styles from './ProgressBar.module.scss';

const cx = classNames.bind(styles);

function ProgressBar({ currentTime, onInput, rangeRef, duration }) {
    return (
        <div className={cx('wrapper')}>
            {duration ? (
                <span className={cx('time')}>
                    {'0' + Math.floor(currentTime / 60)}:
                    {currentTime % 60 < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60)}
                </span>
            ) : (
                ''
            )}
            <input type="range" min="0" max={duration} value={currentTime} ref={rangeRef} onInput={onInput} />
            {duration ? (
                <span className={cx('time')}>
                    {'0' + Math.floor(duration / 60)}:
                    {duration % 60 < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)}
                </span>
            ) : (
                ''
            )}
        </div>
    );
}

export default ProgressBar;
