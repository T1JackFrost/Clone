import Header from './Header/Header';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import Playbar from './Playbar';
import RightSidebar from './RightSidebar/RightSidebar';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <LeftSidebar />
                </div>
                <div className={cx('content')}>
                    <Header />
                    <div className={cx('page')}>{children}</div>
                </div>
                <div className={cx('right-content')}>
                    <RightSidebar />
                </div>
            </div>
            <Playbar />
        </div>
    );
}

export default DefaultLayout;
