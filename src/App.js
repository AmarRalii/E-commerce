import React, { Suspense, useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Componenets/Layout';
import Login from './Componenets/Login/Login';
import Register from './Componenets/Register/Register';
import Categories from './Componenets/Categories/Categories';
import Home from './Componenets/Home/Home';
import Notfound from './Componenets/Notfound';
import Brands from './Componenets/Brands/Brands';
import Cart from './Componenets/Cart/Cart';
import { userContext } from './UserContext';
import { ProtecetdRoute } from './ProtecedRoute';
import ProductDetails from './Componenets/ProductDetails';
import { lazy } from 'react';
import Loading from './Loading';
import WishList from './Componenets/Wishlist/WishList';
import SubCategory from './SubCategory';
import SingelBreand from './SingelBreand';
import Forget from './Componenets/Forget';
// import Parent from './Componenets/Parent';




const Products = lazy(() => import('./Componenets/Products/Products'));
const Orders = lazy(() => import('./Orders'));






export default function App() {

  let { setUser, setLogin } = useContext(userContext)
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUser(localStorage.getItem('userToken'))
      setLogin(localStorage.getItem('userName'))
    }
  }, [])


  const routes = createBrowserRouter([
    {
      path: '', element: <Layout></Layout>, children: [
        { index: true, element: <Login></Login> },
        { path: 'E-commerce/', element: <Login></Login> },
        { path: 'register', element: <Register></Register> },
        { path: 'allorders', element: <Suspense><Orders fallback={<Loading></Loading>}></Orders></Suspense> },
        { path: 'home', element: <ProtecetdRoute><Home></Home></ProtecetdRoute> },
        { path: 'wishlist', element: <ProtecetdRoute><WishList></WishList></ProtecetdRoute> },
        { path: 'cart', element: <ProtecetdRoute> <Cart></Cart></ProtecetdRoute> },
        { path: 'forget', element: <ProtecetdRoute> <Forget></Forget></ProtecetdRoute> },
        { path: 'categories', element: <ProtecetdRoute><Categories></Categories></ProtecetdRoute> },
        { path: 'products', element: <ProtecetdRoute><Suspense fallback={<Loading></Loading>}><Products></Products> </Suspense></ProtecetdRoute> },
        { path: 'productdetails/:id', element: <ProtecetdRoute><ProductDetails></ProductDetails> </ProtecetdRoute> },
        { path: 'subcategory/:id', element: <ProtecetdRoute><SubCategory></SubCategory> </ProtecetdRoute> },
        { path: 'singelbrand/:id', element: <ProtecetdRoute><SingelBreand></SingelBreand> </ProtecetdRoute> },
        { path: 'brands', element: <ProtecetdRoute><Brands></Brands></ProtecetdRoute> },
        { path: '*', element: <Notfound></Notfound> }
      ]
    }
  ])
  return (
    <RouterProvider router={routes}></RouterProvider>

  )
}
