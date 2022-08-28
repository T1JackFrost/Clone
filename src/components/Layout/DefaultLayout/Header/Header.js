import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '~/components/Layout/components/Search';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <Search />
        </header>
    );
}

export default Header;
