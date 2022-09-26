import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import SongItem from '~/components/Layout/components/SongItem';
import styles from './History.module.scss';

import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function History() {
    const [state, dispatch] = useStore();

    const { isPlay, songId, title, artistsNames, srcAudio, thumbnailM, duration } = state;

    const data = { songId, title, artistsNames, srcAudio, thumbnailM, duration };

    // localStorage.setItem(songId, JSON.stringify(data));

    // const dataLocal = JSON.parse(localStorage.getItem(songId));

    return <div className={cx('queue') + ' scroll'}></div>;
}

export default History;
