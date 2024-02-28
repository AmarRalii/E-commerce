import React from "react";
import {
  deleteWish,
  getWish,
  useCrudWish,
  useGetWish,
} from "../../useWishlist";
import Loading from "../../Loading";
import { addToCart, useCrudCart } from "../../useCart";
import Footer from './../../Footer';


export default function WishList() {
  let { data, isError, isLoading, error, refetch } = useGetWish("getWish", getWish);
  let { mutate, data: deletedData, isLoading: deleteLoading } = useCrudWish(deleteWish);
  let {
    mutate: cmutate,
    isError: cisError,
    error: cerror,
    isLoading: cisLoading,
  } = useCrudCart(addToCart);

  const handleRemove = async (id) => {
    await mutate(id)  // Call the delete mutation
    refetch(); // Refresh the wishlist after deletion
  };

  if (isLoading || deleteLoading) return <Loading />;

  if (isError) return <h2 className="text-center fw-bold">{error.message}</h2>;
  

  console.log(data?.data?.data);
  return (
    <div>
    <div className="container wconatiner d-flex justify-content-center align-items-center ">
      <div className="row d-flex flex-column gy-5 wish my-5 ">
        {data.data.data.map((ele) => (
          <div className="row " key={ele.id}>
            <div className="col-md-3">
              <img src={ele.imageCover} className="w-50 my-3 " alt="" />
            </div>
            <div className="col-md-4 d-flex flex-column  justify-content-center ">
              <h4>{ele.title}</h4>
              <p className="fw-bold text-main">{ele.price} EGP</p>
              <p
                className="cursor-pointer text-danger"
                onClick={() => handleRemove(ele.id)} // Call handleRemove function
              >
                Remove <i className="fa-solid fa-trash  "></i>
              </p>
            </div>
            <div className="col-md-5  d-flex justify-content-end align-items-center">
              <button
                className="btn my-3  "
                onClick={() => {
                  cmutate(ele.id);
                  mutate(ele.id);
                  handleRemove(ele.id)
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    
    </div>
      <Footer/>
    </div>
  );
}
