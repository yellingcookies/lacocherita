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
import * as serviceWorkerRegistration from "./components/serviceWorkerRegistration";

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

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Corremos este código si hay una nueva versión de nuestra app
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({type: "SKIP_WAITING"});
      // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
      window.location.reload();
    }
  },
});