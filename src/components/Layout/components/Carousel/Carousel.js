import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
import CarouselItem from './CarouselItem';

const cx = classNames.bind(styles);

function Carousel({ data }) {
    const sliderItems = data.items;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        swipeToSlide: true,
        styles: {
            backgroundColor: 'transparent',
        },
    };
    return (
        <div className={cx('wrapper')}>
            <Slider {...settings} className={cx('carousel-list')}>
                {sliderItems.map((sliderItem) =>
                    sliderItem.type === 1 || sliderItem.type === 4 || sliderItem.type === 8 ? (
                        <CarouselItem key={sliderItem.encodeId} data={sliderItem} className={cx('carousel-item')} />
                    ) : (
                        ''
                    ),
                )}
            </Slider>
        </div>
    );
}

export default Carousel;
