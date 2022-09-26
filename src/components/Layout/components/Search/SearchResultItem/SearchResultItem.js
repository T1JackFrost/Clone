import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './SearchResultItem.module.scss';

const cx = classNames.bind(styles);

function SearchResultItem({ data, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('thumb')}>
                <div className={cx('action')}>
                    <FontAwesomeIcon icon={faPlay} />
                </div>
                <img className={cx('avatar')} src={data.thumbnailM || data.thumbnail} alt={data.thumbnail} />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('song-name')}>{data.title}</h4>
                <span className={cx('artist-name')}>{data.artistsNames}</span>
            </div>
        </div>
    );
}
export default SearchResultItem;
