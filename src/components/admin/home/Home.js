import React, { useEffect } from "react";
import styles from "./Home.module.css"
import InfoBox from "../../infoBox/InfoBox";
import {AiFillDollarCircle} from "react-icons/ai"
import {BsCart4} from "react-icons/bs"
import {FaCartArrowDown} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/slice/productSlice";
import { CALC_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory, selectTotalOrderAmount } from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { CALCULATE_TOTAL_QUANTITY } from "../../../redux/slice/cartSlice";
import Chart from "../../chart/Chart";

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
const productIcon = <BsCart4 size={30} color="#1f93ff"/>
const ordersIcon = <FaCartArrowDown size={30} color="orangered"/>

const Home = () => {
    const products = useSelector(selectProducts)
    const orders = useSelector(selectOrderHistory)
    const totalOrderAmount = useSelector(selectTotalOrderAmount)

    const fbProducts = useFetchCollection("products")
    const {data} = useFetchCollection("orders")

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(STORE_PRODUCTS({
            products: fbProducts.data
        }))

        dispatch(STORE_ORDERS(data))

        dispatch(CALC_TOTAL_ORDER_AMOUNT())
    }, [dispatch, data, fbProducts])

    return (
        <div className={styles.home}>
            <h2>Inicio Administrador</h2>
            <div className={styles["info-box"]}>
                <InfoBox cardClass={`${styles.card} ${styles.card1}`}
                title={"Ganancias"}
                count={`$${totalOrderAmount}`}
                icon={earningIcon}/>
                <InfoBox cardClass={`${styles.card} ${styles.card2}`}
                title={"Productos"}
                count={products.length}
                icon={productIcon}/>
                <InfoBox cardClass={`${styles.card} ${styles.card3}`}
                title={"Ordenes"}
                count={orders.length}
                icon={ordersIcon}/>
            </div>
            <div>
                <Chart/>
            </div>
        </div>
    )
}

export default Home;