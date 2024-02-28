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
  let { setIsOpen, isOpen } = useContext(userContext);
  let { data, isError, isLoading } = useGetCart("getCart", getCart);

  let { mutate, data: deletedData } = useCrudCart(deleteCart);
  let { mutate: mutateupdate, data: updatedate } = useCrudCart(updateCart);
  let { mutate: mutatecheckout, data: checkoutdata } = useCrudCart(checkout);

  // address

  let [details, setDetails] = useState("");
  let [phone, setphone] = useState("");
  let [city, setcity] = useState("");

  function getAddress(e) {
    e.preventDefault();
    let id = data?.data?.data?._id;
    let shippingAddress = {
      details,
      phone,
      city,
    };

    mutatecheckout({ id, shippingAddress });
    if (checkoutdata?.data?.status === "success")
      window.location.href = checkoutdata?.data?.session?.url;
  }

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return (
      <div className="text-center my-4">
        <h4>Cart is empty</h4>
        <img src={emptyimg} height={400} alt="" />
      </div>
    );

  return (
    <aside
      className={data?.data?.numOfCartItems ? "main-color" : "#fff"}
      style={
        isOpen
          ? { right: 0, transition: "right .7s" }
          : { right: "-100%", transition: "right .7s" }
      }
    >
      <Helmet>
        <title>Cart component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className="container my-5 py-5">
        {data?.data?.numOfCartItems ? (
          <>
            <h3>shop cart:</h3>
            <h4>
              total cart price{" "}
              <span className="text-main">
                {data?.data?.data?.totalCartPrice}EGP
              </span>
            </h4>
            <p>
              total cart item{" "}
              <span className="fw-bolder my-3">
                {data?.data?.numOfCartItems}
              </span>
            </p>
            {
              data?.data?.data?.products?.map((ele) => (
                <div className="row align-items-center" key={ele.product._id}>
                  <div className="col-md-9">
                    <div className="row align-items-center">
                      <div className="col-md-2 my-2">
                        <img
                          src={ele.product.imageCover}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="col-md-10">
                        <p>{ele.product.title}</p>
                        <p className="text-main">{ele.price}: EGP</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => mutate(ele.product._id)}
                        >
                          Remove{" "}
                          <i className="fa-solid fa-trash text-main "></i>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <div>
                      <button
                        className="btn brd-btn p-1"
                        onClick={() =>
                          mutateupdate({
                            id: ele.product._id,
                            count: ele.count + 1,
                          })
                        }
                      >
                        +
                      </button>
                      <span className="mx-2">{ele.count}</span>
                      <button
                        className="btn brd-btn p-1"
                        onClick={() =>
                          ele.count === 1
                            ? mutate(ele.product._id)
                            : mutateupdate({
                                id: ele.product._id,
                                count:
                                  ele.count > 0 ? ele.count - 1 : ele.count,
                              })
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))

              // modal
            }

            <button
              type="button"
              className="btn brd-btn btn-lg my-5"
              data-bs-toggle="modal"
              data-bs-target="#modalId"
            >
              checkout
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
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl h-100"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body w-100">
                    <form action="" onSubmit={getAddress}>
                      <input
                        type="text"
                        placeholder="details"
                        onChange={(e) => setDetails(e.target.value)}
                        className="form-control my-5 "
                      />
                      <input
                        type="text"
                        placeholder="phone"
                        onChange={(e) => setphone(e.target.value)}
                        className="form-control my-5"
                      />
                      <input
                        type="text"
                        placeholder="city"
                        className="form-control my-5"
                        onChange={(e) => setcity(e.target.value)}
                      />
                      <button className="btn btn-success" type="submit">
                        send
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
