import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';

const cx = classNames.bind(styles);

function Item({ data }) {
    return (
        <div key={data.encodeId} className={cx('item') + ' col l-2-4'}>
            <div className={cx('item-thumb')}>
                <Link to={data.link} state={{ id: data.encodeId }} className={cx('item-action')}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                </Link>
                <img src={data.thumbnailM || data.thumbnailR} alt={data.sortDescription} className={cx('item-img')} />
            </div>
            <div className={cx('info')}>
                <Link to={data.link} state={{ id: data.encodeId }}>
                    <h3 className={cx('name')}>{data.title}</h3>
                </Link>
                {data.sortDescription && <p className={cx('desc')}>{data.sortDescription}</p>}
            </div>
        </div>
    );
}

export default Item;
