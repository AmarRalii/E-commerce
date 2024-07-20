import React, { useContext } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "./../../Hooks/UserContext";
import { getCart, useCart } from "../../Hooks/useCart";
export default function Navbar() {
  let { data } = useCart("cart", getCart);
  let { userToken, setUserToken } = useContext(UserContext);

  function LogOut() {
    setUserToken(null);
    localStorage.removeItem("userToken");
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand " href=" ">
          <img src={logo} alt="Fresh Cart Logo" />
        </a>
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
          <ul className="navbar-nav mx-auto  mt-2 mt-lg-0">
            {userToken !== null ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/home"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/cart"}>
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/wishList"}>
                    Wish List
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to={"/brand"}>
                    Brand
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to={"/category"}>
                    Category
                  </NavLink>
                </li>
              </>
            ) : (
              " "
            )}
          </ul>
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken !== null ? (
              <>
                <li
                  data-bs-toggle={!userToken ? "modal" : ""}
                  data-bs-target="#exampleModal"
                  className="mx-3"
                >
                  <NavLink to={"cart"}>
                    <i className="fa-solid fa-cart-shopping pt-3 pe-4 cursor-pointer  cartIcon">
                      <span className="  ">{data?.data?.numOfCartItems}</span>
                    </i>
                  </NavLink>
                </li>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/amar.elfarargy" target="_blank">
                      <i className="fa-brands fa-facebook text-dark mt-3 pe-3 border-0 "></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/AmarRalii" target="_blank">
                      <i className="fa-brands fa-github text-dark mt-3 pe-3 "></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/amar-reda-3b6020238/?trk=opento_sprofile_details" target="_blank">
                      <i className="fa-brands fa-linkedin text-dark mt-3 pe-3 "></i>
                    </a>
                  </li>
                </ul>

                <li className="nav-item" onClick={LogOut}>
                  <NavLink className="nav-link " to={"/"}>
                    Logout{" "}
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
               <li
                  data-bs-toggle={!userToken ? "modal" : ""}
                  data-bs-target="#exampleModal"
                  className="mx-3"
                >
                  <NavLink to={"cart"}>
                    <i className="fa-solid fa-cart-shopping pt-3 pe-4 cursor-pointer  cartIcon">
                      <span className="  ">{data?.data?.numOfCartItems}</span>
                    </i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"Register"}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/"}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p>Please Login firest ...</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
