import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Slider.css'
const Slide = ({ children }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1023, min: 767 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 766, min: 0 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        }
    };
    return (
        <div className="slide">
            <div className="slide-container">
                <Carousel swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    // removeArrowOnDeviceType={["tablet", "mobile"]}
                    itemClass="carousel-item-margin-bottom-100-px"
                >
                    {children}
                </Carousel>
            </div>
        </div>
    )
}

export default Slide;