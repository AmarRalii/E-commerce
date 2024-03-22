import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/freshcart-logo.svg";
import { userContext } from "../../UserContext";
import { getCart, useGetCart } from "../../useCart";
export default function Navbar() {
  let { user, setUser, login, setLogin, setIsOpen } = useContext(userContext);
  let { data, isError, error, isLoading } = useGetCart("getCart", getCart);

  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUser(null);
    setLogin(null);
    navigate("/");
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={img} alt="shopping logo" className="w-100" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {user ? (
              <ul className="navbar-nav mx-auto mt-2 mt-lg-0 fs-5">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">
                    WishList
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"categories"}>
                    Categories
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 fs-5">
              <li
                className="nav-item position-relative pe-3"
                data-bs-toggle={!user ? "modal" : ""}
                data-bs-target="#exampleModal"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Link className="nav-link" to="cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <span className="d-inline-block cart d-flex justify-content-center align-items-center position-absolute  rounded-circle ">
                  {data?.data?.numOfCartItems ? data?.data?.numOfCartItems : 0}
                </span>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logout}>
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* modal */}

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">Please Login first..</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
