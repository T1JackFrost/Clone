import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';

const cx = classNames.bind(styles);

function SearchResult({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default SearchResult;
