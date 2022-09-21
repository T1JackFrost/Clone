import classNames from 'classnames/bind';
import styles from './SongItem.module.scss';

const cx = classNames.bind(styles);

function SongItem({ data }) {
    return (
        <div className={cx('song-item')}>
            <img className={cx('img')} src={data.thumbnailM} alt={data.thumbnail} />
            <div className={cx('name')}>
                <h3 className={cx('title')}>{data.title}</h3>
                <p className={cx('artist')}>{data.artistsNames}</p>
            </div>
        </div>
    );
}

export default SongItem;
