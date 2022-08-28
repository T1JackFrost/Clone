import classNames from 'classnames/bind';
import styles from './LeftSidebar.module.scss';
import images from '~/assets/images';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faChartSimple, faMusic, faStar, faIcons } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Layout/components/Menu';
import MenuItem from '~/components/Layout/components/Menu/MenuItem';

const cx = classNames.bind(styles);

function LeftSidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="Zingmp3 logo" className={cx('logo-img')} />
            </div>
            <div className={cx('menu')}>
                <Menu>
                    <MenuItem icon={<FontAwesomeIcon icon={faCompactDisc} />} title="Khám phá" to={'/'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faChartSimple} />} title="Bảng xếp hạng" to={'/rankings'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMusic} />} title="Nhạc mới" to={'/newsongs'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faIcons} />} title="Thể loại" to={'/category'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faStar} />} title="Top 100" to={'/top100'} />
                </Menu>
            </div>
        </aside>
    );
}

export default LeftSidebar;
