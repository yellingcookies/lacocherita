import React, { useEffect } from "react";
import styles from "./OrdersHistory.module.css"
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate} from "react-router-dom";

const OrdersHistory = () => {
    const {data, isLoading} = useFetchCollection("orders");
    const orders = useSelector(selectOrderHistory)
    const userID = useSelector(selectUserID)

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(() =>{
        dispatch(STORE_ORDERS(data))
    }, [dispatch, data])

    const handleClick = (id) => {
        Navigate(`/order-details/${id}`)
    }

    const filteredOrders = orders.filter((order) => order.userID === userID)
    
    return <section>
            <div className={`container ${styles.order}`}>
                <h2>Su historial de ordenes</h2>
                <p>Abra una orden para dejar una <b>reseña de un producto</b></p>
                <br/>
                <>
                    {isLoading && <Loader/>}
                    <div className={styles.table}>
                        {filteredOrders.length === 0 ? (
                            <p>Orden no encontrada</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>s/n</th>
                                        <th>Fecha</th>
                                        <th>ID de la orden</th>
                                        <th>Total de la orden</th>
                                        <th>Estado de la orden</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => {
                                        const {id, orderDate, orderTime, orderAmount, orderStatus} = order
                                        return (
                                            <tr key={id} onClick={() => handleClick(id)}>
                                                <td>{index + 1}</td>
                                                <td>{orderDate} at {orderTime}</td>
                                                <td>{id}</td>
                                                <td>{"$"}{orderAmount}</td>
                                                <td>
                                                    <p className={orderStatus !== "Delivered" ? `${styles.pending}` : `${styles.delivered}`}>
                                                        {orderStatus}
                                                    </p>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            </div>
        </section>
};

export default OrdersHistory;