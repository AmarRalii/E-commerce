import React from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getSingleProduct, useProduct } from "./../../Hooks/useProduct";
import Loading from "./../Loading/Loading";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { addToCart, useCartCrud } from "../../Hooks/useCart";
import { addToWish, useCrudWish } from "../../Hooks/useWishList";
export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 900,
  };

  let { id } = useParams();
  let [heart, setHeart] = useState(false);
  let { data, error, isError, isLoading } = useProduct("productdetails", () =>
    getSingleProduct(id)
  );

  const {
    isError: cartError,
    error: cartErrorMessage,
    isLoading: cartLoading,
    mutate: addToCartMutate
  } = useCartCrud(addToCart);

  const {
    isError: wishError,
    error: wishErrorMessage,
    isLoading: wishLoading,
    mutate: addToWishMutate
  } = useCrudWish(addToWish);

  if (cartError) {
    return (
      <h2 className="text-center text-danger">
        {cartErrorMessage.message || JSON.stringify(cartErrorMessage)}
      </h2>
    );
  }

  if (wishError) {
    return (
      <h2 className="text-center text-danger">
        {wishErrorMessage.message || JSON.stringify(wishErrorMessage)}
      </h2>
    );
  }

  if (cartLoading || wishLoading) {
    return <Loading />;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h2 className="text-center">{error.message}</h2>;
  }

  return (
    <div className="prodct-details">
       <div className="container">
      <Helmet>
        <title>ProductDetails</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="row  py-5">
        <div className="col-md-3">
          <Slider {...settings}>
            {data?.images?.map((img) => (
              <img src={img} key={img} alt=""></img>
            ))}
          </Slider>
        </div>
        <div className="col-md-7">
          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">{data.title.split(' ').splice(0,10).join(' ')}</h3>
            <i
              className="fa-solid fa-heart fa-2x cursor-pointer"
              style={heart ? { color: "red" } : { color: "" }}
              onClick={() => {
                setHeart(!heart);
                addToWishMutate(data._id)
              }}
            ></i>
          </div>

          <p>{data.description.split(' ').splice(0,30).join(' ')}</p>
          <div>
            <span className="main-color">{data.category.name}</span>
          </div>

          <br />
          <div className="box d-flex justify-content-between">
            <span className="fw-bold">{data.price} EGP</span>
            <span>
              {data.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button onClick={()=>{
            addToCartMutate(data._id)
          }}>
            Add To Cart{" "}
          </button>
        </div>
      </div>
    </div>
    </div>
   
  );
}
