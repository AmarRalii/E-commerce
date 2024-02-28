import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { featuredSingleProduct, useProduct } from "../useProduct";
import { addToCart, useCrudCart } from "../useCart";
import Slider from "react-slick";
import Loading from "../Loading";
import { addToWish, useCrudWish } from "../useWishlist";

export default function ProductDetails() {
  let { id } = useParams();
  let { data } = useProduct("prod", () => featuredSingleProduct(id));
  let { mutate, isLoading, isError, error } = useCrudCart(addToCart);

  let [heart, setHeart] = useState(false);

  let {
    mutate: cmutate,
    isError: cisError,
    error: cerror,
    isLoading: cisLoading,
  } = useCrudWish(addToWish);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  if (cisError) return <h2>{cerror.message}</h2>;

  if (cisLoading) return <Loading></Loading>;
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-3">
          <Slider {...settings}>
            {data?.images?.map((img) => (
              <img key={img} src={img} alt=""></img>
            ))}
          </Slider>
        </div>
        <div className="col-md-9">
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
          <div className="d-flex justify-content-between">
            <span>{data?.price} EGB</span>
            <span>
              {data?.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
              <i
                className="fa-solid fa-heart fs-4 m-3 cursor-pointer"
                style={heart ? { color: "red" } : { color: "unset" }}
                onClick={() => {
                  mutate(data._id);
                  setHeart(!heart);
                }}
              ></i>
            </span>
          </div>
          <button
            className="btn brd-btn form-control my-3"
            onClick={() => mutate(data?._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
