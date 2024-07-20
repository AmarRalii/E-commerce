import React, { useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brand from "./Components/Brand/Brand";
import Category from "./Components/Category/Category";
import NotFound from "./Components/Notfound/NotFound";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/Forget-Reset-Password/ForgetPassword";
import ResetPassword from "./Components/Forget-Reset-Password/ResetPassword";
import ProductDetails from "./Components/Product-details/ProductDetails";
import NextPage from "./Components/Home/NextPage";
import SubCategoris from "./Components/Category/SubCategoris";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "./Hooks/UserContext";
import Cart from './Components/Cart/Cart';
import WishList from './Components/WishList/WishList';

export default function App() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken"))
      setUserToken(localStorage.getItem("userToken"));
  }, []);

  const routers = createHashRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          path:'/home',
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "/brand",
          element: (
            <ProtectedRoute>
              {" "}
              <Brand></Brand>{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/nextPage",
          element: (
            <ProtectedRoute>
              <NextPage></NextPage>
            </ProtectedRoute>
          ),
        },
        {
          path: "/category",
          element: (
            <ProtectedRoute>
              <Category></Category>
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishList",
          element: (
            <ProtectedRoute>
              <WishList></WishList>
            </ProtectedRoute>
          ),
        },
        { path: "/Register", element: <SignUp></SignUp> },
        { index:true, element: <Login></Login> },
        { path: "/forgetpassword", element: <ForgetPassword></ForgetPassword> },
        { path: "/restPassword", element: <ResetPassword></ResetPassword> },
        {
          path: "/productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails></ProductDetails>{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/subCategoris/:id",
          element: (
            <ProtectedRoute>
              <SubCategoris></SubCategoris>{" "}
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
}
