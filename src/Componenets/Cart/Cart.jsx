import React, { useContext, useState } from "react";
import { userContext } from "../../UserContext";
import {
  checkout,
  deleteCart,
  getCart,
  updateCart,
  useCrudCart,
  useGetCart,
} from "../../useCart";
import Loading from "../../Loading";
import emptyimg from "../../assets/preview.png";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { setIsOpen, isOpen } = useContext(userContext);
  const { data, isError, isLoading } = useGetCart("getCart", getCart);

  const {
    mutate: deleteProduct,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useCrudCart(deleteCart);
  const { mutate: updateProduct, isLoading: updateLoading } =
    useCrudCart(updateCart);
  const {
    mutate: checkoutCart,
    data: checkoutData,
    isLoading: checkoutLoading,
  } = useCrudCart(checkout);

  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const id = data?.data?.data?._id;
    const shippingAddress = {
      details,
      phone,
      city,
    };

    checkoutCart({ id, shippingAddress });
    if (checkoutData?.data?.status === "success") {
      window.location.href = checkoutData?.data?.session?.url;
    }
  };

  if (isLoading || deleteLoading || updateLoading || checkoutLoading) {
    return <Loading />;
  }

  if (isError || deleteError) {
    return (
      <div className="text-center my-4">
        <h4>Cart is empty</h4>
        <img src={emptyimg} height={400} alt="" />
      </div>
    );
  }

  return (
    <aside
      className={data?.data?.numOfCartItems ? "main-color" : "#fff"}
      style={{
        right: isOpen ? 0 : "-100%",
        transition: "right .7s",
      }}
    >
      <Helmet>
        <title>Cart component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className="container my-5 py-5">
        {data?.data?.numOfCartItems ? (
          <>
            <h3>Shop cart:</h3>
            <h4>
              Total cart price{" "}
              <span className="text-main">
                {data?.data?.data?.totalCartPrice}EGP
              </span>
            </h4>
            <p>
              Total cart item{" "}
              <span className="fw-bolder my-3">
                {data?.data?.numOfCartItems}
              </span>
            </p>
            {data?.data?.data?.products?.map((item) => (
              <div className="row align-items-center" key={item.product._id}>
                <div className="col-md-9">
                  <div className="row align-items-center">
                    <div className="col-md-2 my-2">
                      <img
                        src={item.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-10">
                      <p>{item.product.title}</p>
                      <p className="text-main">{item.price}: EGP</p>
                      <p
                        className="cursor-pointer"
                        onClick={() => deleteProduct(item.product._id)}
                      >
                        Remove <i className="fa-solid fa-trash text-main "></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                  <div>
                    <button
                      className="btn brd-btn p-1"
                      onClick={() =>
                        updateProduct({
                          id: item.product._id,
                          count: item.count + 1,
                        })
                      }
                    >
                      +
                    </button>
                    <span className="mx-2">{item.count}</span>
                    <button
                      className="btn brd-btn p-1"
                      onClick={() =>
                        item.count === 1
                          ? deleteProduct(item.product._id)
                          : updateProduct({
                              id: item.product._id,
                              count: item.count - 1,
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
              type="button"
              className="btn brd-btn btn-lg my-5"
              data-bs-toggle="modal"
              data-bs-target="#modalId"
            >
              Checkout
            </button>
            <div
              className="modal fade"
              id="modalId"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="modalTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl h-100 z-3"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body w-100">
                    <form onSubmit={handleAddressSubmit}>
                      <input
                        type="text"
                        placeholder="Details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="form-control my-5 "
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control my-5"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control my-5"
                      />
                      <button className="btn btn-success" type="submit">
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center my-4">
            <h4>Cart is empty</h4>
            <img src={emptyimg} height={400} className="w-100" alt="" />
          </div>
        )}
      </div>
    </aside>
  );
}
