import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import store from "./redux/store";
import Cart from "./pages/cart/Cart";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import Inventario from "./pages/inventario/Inventario";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Add from "./pages/inventario/Add";
import CheckoutDetails from "./pages/cheackout/CheckoutDetails";
import Checkout from "./pages/cheackout/Checkout";
import CheckoutSuccess from "./pages/cheackout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrdersHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";
import Stock from "./pages/Stock/Stock";
import CartOrder from "./pages/cartprocess/CartOrder";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>

    <BrowserRouter>
    <ToastContainer/>
       <Header/>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/order-history" element={<OrderHistory/>} />
           <Route path="/order-details/:id" element={<OrderDetails/>} />
           <Route path="/review-products/:id" element={<ReviewProducts/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           <Route path="/reset" element={<Reset/>} />
           <Route path="/cart/:id" element={<Cart/>} />
           <Route path="/cart-order/:id" element={<CartOrder/>}/>
           <Route path="/checkout-details" element={<CheckoutDetails/>} />
           <Route path="/checkout" element={<Checkout/>} />
           <Route path="/checkout-success" element={<CheckoutSuccess/>} />
           <Route path="/admin/*" element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>} />
           <Route path="/inventario" element={<Inventario/>}/>
           <Route path="/product-details/:id" element={<ProductDetails/>}/>
           <Route path="/add" element={<Add/>}/>
           <Route path="/stock" element={<Stock/>}/>
           <Route path="*" element={<NotFound/>}/>
         </Routes>
       <Footer/>
     </BrowserRouter>
  </Provider>
);

