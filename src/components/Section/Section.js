import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

function Section({ title, data, children, flex }) {
    return (
        <div className={cx('wrapper') + ' grid'}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{title}</h3>
            </div>
            <div className={cx('list', flex && 'flex') + ' row'}>{children}</div>
        </div>
    );
}

export default Section;
