import React, { useState } from "react";
import {
  deleteCart,
  getCart,
  ubdateCart,
  useCart,
  useCartCrud,
  checkout,
} from "../../Hooks/useCart";
import img from "../../assets/preview.png";
import Helmet from "react-helmet";
import Loading from "./../Loading/Loading";
import "./Cart.scss";
export default function Cart() {
  let [details, setdetails] = useState("");
  let [phone, setphone] = useState("");
  let [city, setcity] = useState("");

  let { data, isLoading, isError } = useCart("cart", getCart);
  let {
    mutate,
    isLoading: load,
    isError: err,
    error: er,
  } = useCartCrud(deleteCart);
  let { mutate: mutateubdate, isLoading: wLoading } = useCartCrud(ubdateCart);
  let { mutate: mutateonline, data: dataonline } = useCartCrud(checkout);

  function addAddr(e) {
    e.preventDefault();
    let shippingAddress = {
      details,
      phone,
      city,
    };
    mutateonline({ id: data?.data?.data?._id, shippingAddress });

    if (dataonline?.data?.status === "success")
      window.location.href = dataonline?.data?.session?.url;
  }

  if (load || wLoading) {
    return <Loading></Loading>;
  }

  if (err) {
    return <h2 className="text-center">{er.message}</h2>;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return (
      <div className="text-center my-4">
        <h4>Cart is empty</h4>
        <img src={img} height={400} alt="" />
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container my-5 ">
        <Helmet>
          <title>Cart</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        {data?.data?.numOfCartItems ? (
          <>
            {" "}
            <h3>Number Of Cart Items {data?.data?.numOfCartItems}</h3>
            <p className="">
              Total Cart Price{" "}
              <span className="fw-bolder mx-3">
                {data?.data?.data?.totalCartPrice} EGP
              </span>{" "}
            </p>
            {data?.data?.data?.products.map((prod) => (
              <div className="row gy-2 py-3" key={prod.product._id}>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-2 gy-3">
                      <img src={prod.product.imageCover} alt="" />
                    </div>
                    <div className="col-md-10 ">
                      <div>
                        <p>{prod.product.title.split(' ').slice(0,2).join(' ')}</p>
                        <h6 className="text-main fw-bold">{prod.price} EGP</h6>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            mutate(prod.product._id);
                          }}
                        >
                          <i className="fa-solid fa-trash "></i> Remove
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4  ">
                  <div>
                    <button
                      onClick={() =>
                        mutateubdate({
                          id: prod.product._id,
                          count: prod.count + 1,
                        })
                      }
                    >
                      +
                    </button>
                    <span className="px-1">{prod.count}</span>
                    <button
                      onClick={() =>
                        prod.count === 1
                          ? mutate(prod.product._id)
                          : mutateubdate({
                              id: prod.product._id,
                              count:
                                prod.count > 0 ? prod.count - 1 : prod.count,
                            })
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="p-2 button my-3"
              data-bs-toggle="modal"
              data-bs-target="#modalId"
            >
              Checkout
            </button>
            <div
              className="modal fade"
              id="modalId"
              data-bs-backdrop="static"
              data-bs-keyboard="true"
              role="dialog"
              aria-labelledby="modalTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered "
                role="document"
              >
                <div className="modal-content ">
                  <div className="modal-header">
                    <p>Input Your Details</p>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body ">
                    <form action="" className="">
                      <input
                        type="text"
                        className="form-control my-2 "
                        placeholder="Name"
                        onChange={(e) => setdetails(e.target.value)}
                      />
                      <input
                        type="tel"
                        className="form-control my-2"
                        placeholder="phone"
                        onChange={(e) => setphone(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="city"
                        onChange={(e) => setcity(e.target.value)}
                      />
                      <button
                        className="button my-3"
                        type="submit"
                        onClick={addAddr}
                      >
                        add address{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart text-center ">
            <h2 className="fw-bold "> Your Cart Is Empty </h2>
            <img src={img} className="w-75 text-center" alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

