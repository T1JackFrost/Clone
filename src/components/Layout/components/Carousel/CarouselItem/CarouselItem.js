import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CarouselItem.module.scss';

const cx = classNames.bind(styles);

function CarouselItem({ className, data }) {
    return (
        <Link to={`/album/${data.encodeId}`} className={className}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </Link>
    );
}

export default CarouselItem;
