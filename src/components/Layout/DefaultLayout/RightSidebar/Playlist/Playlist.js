import classNames from 'classnames/bind';
import SongItem from '~/components/Layout/components/SongItem';
import styles from './Playlist.module.scss';

import { useStore, actions } from '~/store';
import Listening from './Listening';

const cx = classNames.bind(styles);

function Playlist() {
    const [state, dispatch] = useStore();
    const { albumSong, isPlay } = state;

    return (
        <div className={cx('queue') + ' scroll'}>
            {isPlay && <Listening className={cx('listening')} />}
            {albumSong?.map((song) => (
                <SongItem
                    key={song.encodeId}
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
                                songId: song.encodeId,
                                duration: song.duration,
                            }),
                        );
                    }}
                />
            ))}
        </div>
    );
}

export default Playlist;
