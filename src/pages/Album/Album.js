import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import request from '~/ultis/request';

import SongItem from '~/components/Layout/components/SongItem';
import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function Album() {
    const [state, dispatch] = useStore();
    const { album } = state;

    const albumResult = album?.song?.items;

    const { albumId } = useParams();

    useEffect(() => {
        request.get(`/detailplaylist?id=${albumId}`).then((res) => dispatch(actions.setAlbum(res.data)));
    }, [albumId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cd-thumb')}></div>
            <div className={cx('song-list')}>
                {albumResult?.map((song) => (
                    <SongItem key={song.encodeId} data={song} />
                ))}
            </div>
        </div>
    );
}

export default Album;
