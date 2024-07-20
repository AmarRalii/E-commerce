import React, { useState } from "react";
import "./Home.scss";
import { getProductPage2, useProduct } from "../../Hooks/useProduct";
import Loading from "../Loading/Loading";
import Product from "../SingelProduct/Product";
import { NavLink } from "react-router-dom";
import CategorySlider from "../Sliders/CategorySlider/CategorySlider";
import HomeSlider from "./../Sliders/HomeSlider/HomeSlider";
export default function NextPage() {
  let [searchedArr, setSearchedArr] = useState([]);
  function search(e) {
    let term = e.target.value;
    let newArr = data?.filter((ele) =>
      ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArr(newArr);
  }
  let { data, isLoading, error, isError } = useProduct(
    "productPage2",
    getProductPage2
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h1 className="text-center text-danger">{error}</h1>;
  }
  return (
    <div className="home">
      <div className="container">
        <HomeSlider></HomeSlider>
        <br />
        <br />
        <CategorySlider></CategorySlider>
        <br />
        <div className="row mt-5 gy-4">
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
          <NavLink className="border-0 nav-link d-flex mt-2" to={"/home"}>
            <i class="fa-solid fa-angles-left nav-link "></i>
            <h5>1</h5>
          </NavLink>
          <NavLink className="border-0 nav-link  mt-3">
            <p>2</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
