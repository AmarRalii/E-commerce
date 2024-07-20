import React from 'react';
import Helmet from 'react-helmet';
import { getCategory, useProduct } from '../../Hooks/useProduct';
import { Link } from 'react-router-dom';
import Loading from './../Loading/Loading';
import './Category.scss'
export default function Categories() {
  const { data, error, isError, isLoading } = useProduct('category', getCategory);

  if (isLoading) {
    return (
        <Loading /> 
    );
  }

  if (isError) {
    return (
      <div className="container text-center text-danger"> 
        <h2>{error?.message || "An error occurred while loading categories."}</h2> 
      </div>
    );
  }

  return (
    <div className="category">
      <div className="container">
      <Helmet>
        <title>All Product Categories</title> {/* Updated title */}
        <meta name="description" content="Browse all product categories." /> {/* Updated meta description */}
      </Helmet>

      <div className="row gy-4">
        <h1 className=" text-center my-5 fw-bold">All Categories</h1>
        {data.map((category) => (
          <div className="col-md-4 text-center text-main category" key={category._id}> {/* Added `key` */}
            <Link to={`/subCategoris/${category._id}`}>
              <img src={category.image}  className="w-100" alt={category.name} /> {/* Updated alt text */}
              <h3 className="py-2 ">{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
}








