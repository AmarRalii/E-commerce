import React from "react";
import { getCategory, useProduct } from "./../../../Hooks/useProduct";
import Slider from "react-slick";
import "./CategorySlider.scss";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplayspeed: 300,
  };
  let { data } = useProduct("CategorySlider", getCategory);
  console.log(data);

  return (
    <div className="CategorySlider">
      <div className="row">
        <Slider {...settings}>
          {data?.map((ele) => (
            <img key={ele.image} src={ele?.image} alt="category img"></img>
          ))}
        </Slider>
      </div>
    </div>
  );
}
