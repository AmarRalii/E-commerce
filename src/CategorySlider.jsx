import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows:false,
    autoplay:true,
    autoplaySpeed:2000
  };

   function getCat() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data} = useQuery('cateogry',getCat)
  console.log(data?.data?.data);

  return (
    <div className='row my-4'>
      <Slider {...settings}>
        {data?.data?.data.map((ele)=><img key={ele._id} className='w-100' height={150} src={ele.image}></img>)}
      </Slider>
    </div>
  )
}
