import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchResultItem.module.scss';

const cx = classNames.bind(styles);

function SearchResultItem({ data, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <img className={cx('avatar')} src={data.thumbnailM || data.thumbnail} alt={data.thumbnail} />
            <div className={cx('info')}>
                <h4 className={cx('song-name')}>{data.title}</h4>
                <span className={cx('artist-name')}>{data.artistsNames}</span>
            </div>
        </div>
    );
}

SearchResultItem.propTypes = {
    data: PropTypes.object,
};

export default SearchResultItem;
