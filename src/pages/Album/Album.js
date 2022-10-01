import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import request from '~/ultis/request';
import SongItem from '~/components/Layout/components/SongItem';
import { useStore, actions } from '~/store';
import Loading from '~/components/Layout/components/Loading';
import ContentTitle from '~/components/Layout/components/SongItem/ContentTitle';

const cx = classNames.bind(styles);

function Album() {
    const [state, dispatch] = useStore();
    const { album, isPlay, albumSong } = state;

    const { albumId } = useParams();

    const updateTime = new Date(album?.contentLastUpdate * 1000);

    useEffect(() => {
        request.get(`/detailplaylist?id=${albumId}`).then((res) => dispatch(actions.setAlbum(res.data)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [albumId]);

    if (Object.keys(album).length === 0) {
        return <Loading />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cd-thumb')}>
                <img src={album.thumbnail} alt={album.title} className={cx('cd-img', isPlay && 'cd-isplaying')} />
                <h3 className={cx('cd-title')}>{album.title}</h3>
                <p className={cx('time-update')}>
                    {`Cập nhật: ${updateTime.getDate()}/${updateTime.getMonth()}/${updateTime.getFullYear()}`}
                </p>
                <p className={cx('artist')}>{album.artistsNames}</p>
                <p className={cx('like')}>{`${album.like} người yêu thích`}</p>
            </div>
            <div className={cx('album')}>
                <h3 className={cx('album-desc')}>Lời tựa {album?.sortDescription}</h3>
                <ContentTitle />
                <div className={cx('song-list') + ' scroll'}>
                    {albumSong?.map((song) => (
                        <div key={song.encodeId} className={cx('song-item')}>
                            <SongItem
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Album;
