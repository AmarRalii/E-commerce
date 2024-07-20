import React from 'react'
import slide1 from '../../../assets/slider-image-1.jpeg';
import slide2 from '../../../assets/slider-image-2.jpeg';
import slide3 from '../../../assets/slider-image-3.jpeg';
import blog1 from '../../../assets/blog-img-1.jpeg';
import blog2 from '../../../assets/blog-img-2.jpeg';
import './HomeSlider.scss'
import Slider from "react-slick";

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplayspeed: 1000
      };
  return (
    <header>
        <div className="home-slider">
            <div className="row gx-0">
            <div className="col-md-9">
                <Slider {...settings}>
                    <img src={slide1} className='w-100 cursor-pointer1'  alt="" />
                    <img src={slide2} className='w-100'   alt="" />
                    <img src={slide3} className='w-100'   alt="" />
                </Slider>
            </div>
            <div className="col-md-4">
                <img src={blog1} className='w-100'  alt="" />
                <img src={blog2} className='w-100'  alt="" />
            </div>
        </div>
        </div>
        
    </header>
  )
}
