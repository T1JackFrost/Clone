import styles from '~/components/Layout/components/SongItem/SongItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ContentTitle() {
    return (
        <div className={`${styles['song-item']} ${styles['song-disabled']}`}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className={`${styles['song-icon']}`} />
            <span className={`${styles['song-info']}`}>Name</span>
            <span className={`${styles['album']}`}>ALBUM</span>
            <span className={`${styles['time']}`}>TIME</span>
        </div>
    );
}

export default ContentTitle;
