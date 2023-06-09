import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Navbar from "../../components/admin/navbar/Navbar";
import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import styles from "./Admin.module.css";
import Home from "../../components/admin/home/Home";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import RegisterAdmin from "../../components/admin/registerAdmin/RegisterAdmin";
import HelpAdmin from "../../components/admin/helpAdmin/HelpAdmin";
import StockAdmin from "../../components/admin/stockadmin/StockAdmin";
import AddStock from "../../components/admin/addStock/AddStock";

const Admin = () => {
    return <div className={styles.admin}>
        <div className={styles.navbar}>
            <Navbar/>
        </div>
        <div className={styles.content}>
            <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="all-products" element={<ViewProducts/>}/>
                <Route path="add-product/:id" element={<AddProduct/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="order-details/:id" element={<OrderDetails/>}/>
                <Route path="register-admin" element={<RegisterAdmin/>}/>
                <Route path="help-admin" element={<HelpAdmin/>}/>
                <Route path="stock" element={<StockAdmin/>}/>
                <Route path="add-stock/:id" element={<AddStock/>}/>
            </Routes>
        </div>
    </div>

};

export default Admin;