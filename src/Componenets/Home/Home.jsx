import Loading from "../../Loading";
import { featuredProduct, useProduct } from "../../useProduct";
import Product from "../Product";
import MainSlider from "../../MainSlider";
import CategorySlider from "../../CategorySlider";
import { Helmet } from "react-helmet";
import Footer from "./../../Footer";

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
      <br />
      <br />

      <div className="row">
        {data?.map((prod) => (
          <Product key={prod._id} prod={prod}></Product>
        ))}
      </div>
      <Footer />
    </div>
  );
}
