import React from "react";
import Loading from "../../Loading";
import { featuredCategory, useProduct } from "../../useProduct";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../Footer";

export default function Categories() {
  let { data, isError, error, isLoading } = useProduct(
    "category",
    featuredCategory,
    {}
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container ">
      <h1 className="fw-bold text-main text-center py-4">All Categories</h1>
      <Helmet>
        <title>Category component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <br />
      <div className="row gy-5">
        {data?.map((ele) => (
          <div className="col-md-4 cursor-pointer category" key={ele._id}>
            <Link to={`/subcategory/${ele._id}`}>
              <div className="card text-center  border-0">
                <img src={ele.image} className="w-100" alt="" />
                <h3 className="py-4 text-main fw-bold"> {ele.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
