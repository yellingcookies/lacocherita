import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./NavbarEmployee.module.css";

const activeLink = ({isActive}) =>(isActive ? `${styles.active}` : "");

const NavbarEmployee = () => {
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
                        <NavLink to="/employee/home" className={activeLink}>
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee/orders" className={activeLink}>
                            Ordenes
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavbarEmployee;