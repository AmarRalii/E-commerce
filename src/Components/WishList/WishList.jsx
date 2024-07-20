import React, { useEffect } from "react";
import {
  deleteWish,
  getWish,
  useCrudWish,
  useGetWish,
} from "../../Hooks/useWishList.js";
import { addToCart, useCartCrud } from "./../../Hooks/useCart.js";
import Loading from "./../Loading/Loading.jsx";
import { Helmet } from "react-helmet";
import "./WishList.scss";

export default function WishList() {
  let { data, isError, isLoading, error, refetch } = useGetWish(
    "getWish",
    getWish
  );
  let { mutate, isLoading: deleteLoading } = useCrudWish(deleteWish);
  let {
    mutate: cmutate,
    isError: cisError,
    error: cerror,
    isLoading: cisLoading,
  } = useCartCrud(addToCart);

  const handleRemove = async (id) => {
    await mutate(id);
    refetch();
  };

  useEffect(() => {
    getWish();
  }, []);

  if (isLoading || cisLoading || deleteLoading) {
    return <Loading></Loading>;
  }

  if (isError) return <h2 className="text-center fw-bold">{error.message}</h2>;

  if (cisError)
    return <h2 className="text-center fw-bold">{cerror.message}</h2>;

  return (
    <div className="wish-list">
      <div className="container">
        <Helmet>
          <title>WishList</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        {data?.data?.count ? (
          <>
            <div className="row d-flex  gy-5  my-5 ">
              {data.data.data.map((ele) => (
                <div className="row " key={ele.id}>
                  <div className="col-md-7">
                    <div className="col-md-4">
                      <img src={ele.imageCover} className=" my-3 " alt="" />
                    </div>
                    <div className="col-md-6 ">
                      <h4>{ele.title.split(" ").slice(0, 3).join(" ")}</h4>
                      <p className="fw-bold ">{ele.price} EGP</p>
                      <p
                        className="cursor-pointer text-danger"
                        onClick={() => handleRemove(ele.id)}
                      >
                        Remove <i className="fa-solid fa-trash  "></i>
                      </p>
                    </div>
                  </div>

                  <div className="col-md-5 ">
                    <button
                      className=" my-3 button "
                      onClick={() => {
                        cmutate(ele.id);
                        handleRemove(ele.id);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className=" my-5">Your Wish List is empty</h2>
        )}
      </div>
    </div>
  );
}
