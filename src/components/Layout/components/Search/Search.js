import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input placeholder="Tìm kiếm bài hát, nghệ sĩ,..." />
                <button className={cx('clear')}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default Search;
