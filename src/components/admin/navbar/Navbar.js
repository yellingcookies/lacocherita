import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.css";

const activeLink = ({isActive}) =>(isActive ? `${styles.active}` : "");

const Navbar = () => {
    const userName = useSelector(selectUserName)
    return (
        <div className={styles.navbar}>
            <div className={styles.user}> 
                <FaUserCircle size={40} color="#fff"/>
                <h4>
                {userName}
                </h4>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/home" className={activeLink}>
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-products" className={activeLink}>
                            Todos los Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-product/ADD" className={activeLink}>
                            Agregar Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders" className={activeLink}>
                            Ordenes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/register-admin" className={activeLink}>
                            Registrar Admin
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;