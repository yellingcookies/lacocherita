import React, { useEffect } from "react";
import { useState } from "react";
import {Link, NavLink} from "react-router-dom";
import styles from "./Header.module.css";
// import {Link} from "react-router-dom";
import {FaShoppingCart, FaUserCircle} from "react-icons/fa";
import {FaTimes} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectUserID } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import AdminOnlyRoute, { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import { Timestamp } from "firebase/firestore";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";

const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
              La<span>Cocherita</span>
            </h2>
        </Link>
    </div>
);

const activeLink = ({isActive}) =>(isActive ? `${styles.active}` : "");

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [displayName, setdisplayName] = useState("");
    const [scrollPage, setScrollPage] = useState(false)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const orders = useSelector(selectOrderHistory)
    const {data, isLoading} = useFetchCollection("orders");
    const userID = useSelector(selectUserID)

    
    const ActualOrders = orders.filter((order) => order.orderStatus === "Order Placed..." && order.userID === userID)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(STORE_ORDERS(data)) 
    }, [dispatch, data]);

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }, [])

    const fixNavbar = () => {
        if(window.scrollY > 50){
            setScrollPage(true)
        } else{
            setScrollPage(false)
        }
    }

    window.addEventListener("scroll", fixNavbar)
    // Monitor currently sign in user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // console.log(user);
                if(user.displayName == null){
                    const u1 = user.email.substring(0, user.email.indexOf("@"));
                    const uName= u1.charAt(0).toUpperCase() + u1.slice(1);
                    setdisplayName(uName);
                } else{
                    setdisplayName(user.displayName);
                }
                
                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid,
                }))
            } else {
                setdisplayName("");
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName])

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Se cerró la sesión.");
            navigate("/");
          }).catch((error) => {
            toast.error(error.message);
          });
    };

    const orderverification = () => {
        if(ActualOrders.length>0){
            const a = orders[0].id
            navigate(`/cart/${a}`)
        }
    }

    const cart = ( 
        <span className={styles.cart} onClick={orderverification}>
                <Link to="/cart/ADD">Carrito
                <FaShoppingCart size={20}/> 
                <p>{cartTotalQuantity}</p>
                </Link>
        </span>
    );


    return (
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
            {logo}
            <nav className={showMenu ? `${styles["show-nav"]}`
            :`${styles["hide-nav"]}`}>
                <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}>
                </div>
                <ul onClick={hideMenu}>
                    <li className={styles["logo-mobile"]}>
                        {logo}
                        <FaTimes size={22} color="#fff" onClick={hideMenu}/>
                    </li>
                    <li>
                        <AdminOnlyLink>
                        <Link to="/admin/home">
                        <button className="--btn --btn-primary">Admin</button>
                        </Link>
                        </AdminOnlyLink>
                    </li>
                    <li>
                        <NavLink to="/" className={activeLink}>
                        {/* <a className={activeLink}> */}
                            Inicio
                        {/* </a> */}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={activeLink}>
                        {/* <a  className={activeLink}> */}
                            Contactanos
                        {/* </a> */}
                        </NavLink>
                    </li>
                </ul>
                <div className={styles["header-right"]} onClick={hideMenu}>
                    <span className={styles.links}>
                        <ShowOnLogout>
                        <NavLink to="/login" className={activeLink}>Iniciar Sesión</NavLink>
                        </ShowOnLogout>
                        {/* <a className={activeLink}>
                            Login
                        </a> */}
                        <ShowOnLogin>
                        <a href="#home" style={{color: "#90EE90"}}>
                            <FaUserCircle size={16}/>
                            Hola, {displayName}
                        </a>
                        </ShowOnLogin>
                        {/* <a className={activeLink}>
                            Register
                        </a> */}
                        <ShowOnLogin>
                        <NavLink to="/order-history" className={activeLink}>Mis Ordenes</NavLink>
                        </ShowOnLogin>
                        {/* <a className={activeLink}>
                            My Orders
                        </a> */}
                        <ShowOnLogin>
                        <NavLink to="/" onClick={logoutUser}>Cerrar Sesión</NavLink>
                        </ShowOnLogin>
                    </span>
                    {cart}
                </div>
            </nav>

            <div className={styles["menu-icon"]}>
                {cart}
                <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
            </div>
        </div>
      </header>
    );
};

export default Header;