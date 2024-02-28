import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { featuredSingelBrand, useProduct } from "./useProduct";

export default function SingelBreand() {
  let { id } = useParams();

  let { data, isLoading, isError, error } = useProduct("singelBrand", () =>
    featuredSingelBrand(id)
  );

  if (isError) return <h2 className="text-center fw-bold">{error.message}</h2>;

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="container  d-flex justify-content-center h-100 flex-column">
      <h1 className="text-center fw-bold text-main py-3">{data.name} Brand</h1>
      <div className="subBrand d-flex justify-content-around align-items-center ">
        <h1 className="text-dark text-center fw-bold">{data.name}</h1>
        <img src={data.image} className="w-50" alt="" />
      </div>
    </div>
  );
}
