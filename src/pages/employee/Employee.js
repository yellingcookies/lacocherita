import { Route, Routes } from "react-router-dom";
import styles from "./Employee.module.css";
import Orders from "../../components/admin/orders/Orders";
import NavbarEmployee from "../../components/employee/navbar/NavbarEmployee";


import Home from "../../components/admin/home/Home";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
const Employee = () => {
    return <div className={styles.admin}>
        <div className={styles.navbar}>
            <NavbarEmployee/>
        </div>
        <div className={styles.content}>
            <Routes>
                {/* <Route path="home" element={<Home/>}/>
                <Route path="all-products" element={<ViewProducts/>}/>
                <Route path="add-product/:id" element={<AddProduct/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="order-details/:id" element={<OrderDetails/>}/>
                <Route path="register-admin" element={<RegisterAdmin/>}/>
                <Route path="help-admin" element={<HelpAdmin/>}/> */}
                <Route path="home" element={<Home/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="order-details/:id" element={<OrderDetails/>}/>
            </Routes>
        </div>
    </div>

};

export default Employee;