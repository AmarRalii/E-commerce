import React from "react";
import { useParams } from "react-router-dom";
import Loading from "./../Loading/Loading";
import { getSubCategory, useProduct } from "./../../Hooks/useProduct";
import "./subCategoris.scss";
export default function SubCategoris() {
  let { id } = useParams();
  let { data, isError, isLoading, error } = useProduct("SubCategory", () =>
    getSubCategory(id)
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return (
      <h2 className="text-center text-main fw-bold my-5">{error.message}</h2>
    );
  }
  return (
    <div className="SubCategoris">
      <div className="container">
        <div>
          <h2 className=" text-center fw-bold my-5">All Sub Categories </h2>
          <div className="row">
            {data.map((ele) => (
              <div className="col-md-3 cursor-pointer">
                <h3 className=" text-center p-3 sub">{ele.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
