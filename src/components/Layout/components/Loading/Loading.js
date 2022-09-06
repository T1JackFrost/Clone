import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />
            <h2 className={cx('loading')}>Loading</h2>
        </div>
    );
}

export default Loading;
