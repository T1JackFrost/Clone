import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';
import SongItem from '~/components/Layout/components/SongItem';
import Playlist from './Playlist';
import History from './History';

const cx = classNames.bind(styles);

const tabs = [
    { tabname: 'Danh sách phát', component: Playlist },
    { tabname: 'Nghe gần đây', component: History },
];

function RightSidebar() {
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const Queue = currentTab.component;

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('queue-select')}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={cx('queue-item', tab.tabname === currentTab.tabname && 'queue-item-active')}
                        onClick={() => setCurrentTab(tab)}
                    >
                        {tab.tabname}
                    </div>
                ))}
            </div>
            <Queue />
        </aside>
    );
}

export default RightSidebar;
