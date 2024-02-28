import Loading from "../../Loading";
import { featuredProduct, useProduct } from "../../useProduct";
import Product from "../Product";
import MainSlider from "../../MainSlider";
import CategorySlider from "../../CategorySlider";
import { Helmet } from "react-helmet";
import Footer from './../../Footer';


export default function Home() {



  let { data, isError, error, isLoading } = useProduct(
    "products",
    featuredProduct,
    {}
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container">
      <Helmet>
        <title>Home component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <MainSlider />
      <CategorySlider />
      <br />
      <div class="group py-5 ">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input placeholder="Search" type="search" className="input w-100" />
      </div>
      <div className="row">
        {data?.map((prod) => (
          <Product key={prod._id} prod={prod}></Product>
        ))}
      </div>
     <Footer/>
    </div> 
  );
}
