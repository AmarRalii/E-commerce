import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCrudCart } from "../useCart";
import Loading from "../Loading";
import { useCrudWish, addToWish } from './../useWishlist';

export default function Product({ prod }) {
  let [heart, setHeart] = useState(false);

  let { mutate : cmutate, isError: cisError, error: cerror, isLoading: cisLoading } = useCrudCart(addToCart);

  let { mutate, isError, error, isLoading } = useCrudWish(addToWish);


  if (cisError) return <h2>{cerror.message}</h2>;

  if (isError) return <h2>{error.message}</h2>;

  if (cisLoading) return <Loading></Loading>;

  if (isLoading) return <Loading></Loading>;




  return (
    <div className="col-md-3">
      <div className="product p-2 cursor-pointer fw-bold ">

          <i
            className="fa-solid fa-heart fs-4 m-3 cursor-pointer"
            style={heart ? { color: "red" } : { color: "unset" }}
            onClick={() => {
              mutate(prod._id); 
              setHeart(!heart);
            } }
          ></i>


        <Link to={`/productdetails/${prod._id}`}>
          <img src={prod.imageCover} className="w-100" alt={prod.title} />
          <h2 className="h5 text-main fw-bold">{prod.category.name}</h2>
          <p>{prod.title}</p>
          <div className="d-flex justify-content-between">
            <span>{prod.price} EGB</span>
            <span>
              {prod.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
        </Link>
        <button className="btn my-3 w-75 " onClick={() => cmutate(prod._id)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
