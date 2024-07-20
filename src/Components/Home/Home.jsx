import React, { useState } from "react";
import "./Home.scss";
import { getProduct, useProduct } from "./../../Hooks/useProduct";
import Loading from "../Loading/Loading";
import Product from "./../SingelProduct/Product";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import HomeSlider from "./../Sliders/HomeSlider/HomeSlider";
import CategorySlider from "./../Sliders/CategorySlider/CategorySlider";

export default function Home() {
  let [searchedArr, setSearchedArr] = useState([]);
  function search(e) {
    let term = e.target.value;
    let newArr = data?.filter((ele) =>
      ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArr(newArr);
  }

  let { data, isLoading, error, isError } = useProduct("product", getProduct);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <h1 className="text-center text-danger">{error}</h1>;
  }

  return (
    <div className="home">
      <div className="container">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <HomeSlider></HomeSlider>
        <br />
        <br />
        <CategorySlider></CategorySlider>
        <br />
        <div className="row mt-5 gy-4">
          <h1>All Product</h1>
          <br />
          <div class="form-control">
            <input
              class="input input-alt"
              placeholder="Search . . . ."
              required=""
              type="text"
              onChange={search}
            />
            <span class="input-border input-border-alt"></span>
          </div>
          <br />
          {searchedArr.length
            ? searchedArr?.map((prod) => (
                <Product key={prod._id} prod={prod}></Product>
              ))
            : data?.map((prod) => (
                <Product key={prod._id} prod={prod}></Product>
              ))}
        </div>
        <div className="next-page mt-3">
          <NavLink className="border-0 nav-link  mt-3">
            <p>1</p>
          </NavLink>

          <NavLink className="border-0 nav-link d-flex mt-2 " to={"/nextPage"}>
            <h5>2</h5>
            <i class="fa-solid fa-angles-right nav-link "></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
