import React from "react";
import Loading from "../../Loading";

import { featuredBrand, useProduct } from "../../useProduct";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "./../../Footer";

export default function Brands() {
  let { data, isError, error, isLoading } = useProduct(
    "brand",
    featuredBrand,
    {}
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;
  console.log(data);
  return (
    <div className="container">
      <Helmet>
        <title>Brand component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1 className="text-main text-center fw-bold py-5">All Brands</h1>
      <div className="row">
        {data?.map((ele) => (
          <div className="col-md-3 gy-3" key={ele._id}>
            <Link to={`/singelbrand/${ele._id}`}>
              <div className="barnd text-center gy-2 p-2">
                <img src={ele.image} alt="" className="w-100"/>
                <h2 className="fw-bold ">{ele.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
