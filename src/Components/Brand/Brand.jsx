import React from "react";
import Helmet from "react-helmet";
import { getBrand, useProduct } from "../../Hooks/useProduct";
import Loading from './../Loading/Loading';
import './Brand.scss'
export default function Brands() {
  let { data, isError, isLoading, error } = useProduct("Brands", getBrand);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return (
      <h2 className="text-center text-main fw-bold my-5">{error.message}</h2>
    );
  }
  return (
  <div className="brand">
     <div className="container">
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1 className=" text-center fw-bolder my-5">All Brands </h1>
      <div className="row gy-5">
        {data.map((brand) => (
          <div className="col-md-3  text-center">
            <img src={brand.image} className="w-75"  alt="" />
            <h3 className=" text-center fw-bold my-4">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
   
  );
}
