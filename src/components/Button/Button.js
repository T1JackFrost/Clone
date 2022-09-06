import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ type, to, href, className, onClick, ref, ...passProps }) {
    const handle = { onClick, ...passProps };
    let Comp = 'button';
    const classes = cx('wrapper', type, className);

    if (to) {
        Comp = Link;
        handle.to = to;
    } else if (href) {
        Comp = 'a';
        handle.href = href;
    }
    return (
        <Comp ref={ref} className={classes} {...handle}>
            <span className={cx('title')}>{passProps.children}</span>
        </Comp>
    );
}

export default Button;
