import classNames from 'classnames/bind';
import SongItem from '~/components/Layout/components/SongItem';
import styles from './History.module.scss';

const cx = classNames.bind(styles);

function History() {
    return <div className={cx('queue')}></div>;
}

export default History;
