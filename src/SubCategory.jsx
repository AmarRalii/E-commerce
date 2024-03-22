import React from "react";
import { useParams } from "react-router-dom";
import {
  featuredSingelCategory,
  featuredSubCategory,
  useProduct,
} from "./useProduct";
import Loading from "./Loading";
import Footer from "./Footer";

export default function SubCategory() {
  let { id } = useParams();
  let { data, isError, error, isLoading } = useProduct("subcategory", () =>
    featuredSubCategory(id)
  );
  let { data: udata } = useProduct("singelCat", () =>
    featuredSingelCategory(id)
  );
  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2 className="text-center">{error.message} </h2>;

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center   my-5">
        <div className="row gy-4 m-4  ">
          <h2 className="text-main text-center fw-bold py-5 ">
            {udata.name} SubCategories
          </h2>
          {data?.map((ele) => (
            <div
              className="col-md-3 subCat text-center mx-3 p-3 "
              key={ele._id}
            >
              <h4 className="fw-bold">{ele.name}</h4>
              
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
