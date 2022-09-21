import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import SongItem from '~/components/Layout/components/SongItem';
import styles from './Playlist.module.scss';

import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function Playlist() {
    const [state, dispatch] = useStore();
    const { album } = state;
    const albumSong = album?.song?.items;
    console.log(album);

    return (
        <div className={cx('queue')}>
            {albumSong?.map((song) => (
                <SongItem key={song.encodeId} data={song} />
            ))}
        </div>
    );
}

export default Playlist;
