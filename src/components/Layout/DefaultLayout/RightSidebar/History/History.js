import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import SongItem from '~/components/Layout/components/SongItem';
import styles from './History.module.scss';

import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function History() {
    const [state, dispatch] = useStore();
    const { history } = state;

    return (
        <div className={cx('queue') + ' scroll'}>
            {history?.map((song) => (
                <SongItem
                    key={song.songId}
                    data={song}
                    onClick={() => {
                        dispatch(
                            actions.setSongInfo({
                                title: song.title,
                                artistsNames: song.artistsNames,
                                thumbnailM: song.thumbnailM,
                            }),
                        );
                        dispatch(
                            actions.setSongSelect({
                                songId: song.songId,
                                duration: song.duration,
                            }),
                        );
                    }}
                />
            ))}
        </div>
    );
}

export default History;
