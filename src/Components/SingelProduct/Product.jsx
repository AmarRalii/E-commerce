import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Product.scss';
import { addToCart, useCartCrud } from "../../Hooks/useCart";
import Loading from './../Loading/Loading';
import { addToWish, useCrudWish } from "../../Hooks/useWishList";

export default function Product({ prod }) {
  const [heart, setHeart] = useState(false);

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

  return (
    
    <div className="col-md-3">
      <div className="product cursor-pointer p-2">
        <i
          className="fa-solid fa-heart fa-1x fs-4"
          style={{ color: heart ? "red" : "" }}
          onClick={() => {
            addToWishMutate(prod._id); 
            setHeart(!heart);
          }}
        ></i>

        <NavLink className="nav-link" to={`/productDetails/${prod._id}`}>
          <img src={prod.imageCover} alt={prod.title} className="w-75" />
          <h2 className="h5 text-decoration-none">{prod.category.name}</h2>
          <p>{prod.title.split(' ').slice(0, 4).join(' ')}</p>
          <div className="price-rating d-flex justify-content-around">
            <span className="fw-bold">{prod.price} EGP</span>
            <span>
              {prod.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
        </NavLink>

        <button
          className="button my-2 w-75"
          onClick={() => addToCartMutate(prod._id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
