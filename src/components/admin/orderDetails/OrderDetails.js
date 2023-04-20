import React, { useEffect, useState } from "react"
import styles from "./OrderDetails.module.css"
import useFetchDocument from "../../../customHooks/useFetchDocument"
import spinnerImg from "../../../assets/spinner.gif"
import { Link, useParams } from "react-router-dom"
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus"

const OrderDetails = () => {
    const [order, setOrder] = useState(null)
    const {id} = useParams()
    const { document } = useFetchDocument("orders", id)

    useEffect(() => {
        setOrder(document)
    }, [document])

    return <>
        <div className={`container ${styles.table}`}>
            <h2>Detalles de la orden</h2>
            <div>
                <Link to="/admin/orders">&larr; Regresar a ordenes</Link>
            </div>
            <br/>
            {order == null ? (
                <img src={spinnerImg} alt="Cargando..." style={{width: "50px"}}/>
            ) : (
                <>
                    <p>
                        <b>ID de la orden</b> {order.id}
                    </p>
                    <p>
                        <b>Total de la orden</b> ${order.orderAmount}
                    </p>
                    <p>
                        <b>Dirección de envío</b>
                        <br/>
                        Address: {order.shippingAddress.line1},
                        {order.shippingAddress.line2}, {order.shippingAddress.city},
                        <br/>
                        State: {order.shippingAddress.state}
                        <br/>
                        Country: {order.shippingAddress.country}
                    </p>
                    <br/>
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.cartItems.map((cart, index) => {
                                const {id, name, price, imageURL, cartQuantity} = cart
                                return (
                                    <tr key={id}>
                                        <td>
                                            <b>{index + 1}</b>
                                        </td>
                                        <td>
                                            <p>
                                                <b>{name}</b>
                                            </p>
                                            <img src={imageURL} alt={name} style={{width: "100px"}}/>
                                        </td>
                                        <td>${price}</td>
                                        <td>{cartQuantity}</td>
                                        <td>
                                        ${(price * cartQuantity).toFixed(2)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}
            <ChangeOrderStatus order={order} id={id}/>
        </div>
    </>
}

export default OrderDetails