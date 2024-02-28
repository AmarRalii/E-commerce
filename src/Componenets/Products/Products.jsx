import React, { useState } from "react";
import Loading from "../../Loading";
import { featuredProduct, useProduct } from "../../useProduct";
import Product from "../Product";
import { Helmet } from "react-helmet";
import Footer from "../../Footer";

export default function Products() {
  let { data, isError, error, isLoading } = useProduct(
    "products",
    featuredProduct
  );

  let [searchedArr, setSearchedArr] = useState([]);
  function search(e) {
    let term = e.target.value;
    let newArr = data?.filter((ele) =>
      ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArr(newArr);
  }

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container">
      <Helmet>
        <title>product component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

        <input
          type="text"
          className="form-control w-75 my-5 mx-auto input text-white"
          placeholder="search"
          onChange={search}
        />
      <div className="row">
        {searchedArr.length
          ? searchedArr?.map((prod) => (
              <Product key={prod._id} prod={prod}></Product>
            ))
          : data?.map((prod) => <Product key={prod._id} prod={prod}></Product>)}
      </div>
      <Footer/>
    </div>
  );
}
