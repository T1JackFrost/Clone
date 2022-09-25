import classNames from 'classnames/bind';
import SongItem from '~/components/Layout/components/SongItem';
import styles from './Playlist.module.scss';

import { useStore } from '~/store';

const cx = classNames.bind(styles);

function Playlist() {
    const [state, dispatch] = useStore();
    const { album } = state;
    const albumSong = album?.song?.items;

    return (
        <div className={cx('queue')}>
            {albumSong?.map((song) => (
                <SongItem key={song.encodeId} data={song} />
            ))}
        </div>
    );
}

export default Playlist;
