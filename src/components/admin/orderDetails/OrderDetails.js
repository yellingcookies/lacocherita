import React, { useEffect, useState } from "react"
import styles from "./OrderDetails.module.css"
import useFetchDocument from "../../../customHooks/useFetchDocument"
import spinnerImg from "../../../assets/spinner.gif"
import { Link, useParams } from "react-router-dom"
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus"
import { useSelector } from "react-redux"
import { selectRol } from "../../../redux/slice/authSlice"

const OrderDetails = () => {
    const [order, setOrder] = useState(null)
    const {id} = useParams()
    const { document } = useFetchDocument("orders", id)
    const userRol = useSelector(selectRol)

    useEffect(() => {
        setOrder(document)
    }, [document])

    return <>
        <div className={`container ${styles.table}`}>
            <h2>Detalles de la orden</h2>
            <div>
                {userRol==="employee" ? (
                    <Link to="/employee/orders">&larr; Regresar a ordenes</Link>
                )
                : 
                (
                    <Link to="/admin/orders">&larr; Regresar a ordenes</Link>
                )}
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
                        <b>Número de la mesa</b> {order.table}
                    </p>
                    {order.shippingAddress ? (<p>
                        <b>Dirección de envío</b>
                        <br/>
                        Nombre: {order.shippingAddress.name}
                        <br/>
                        Dirección: {order.shippingAddress.line1},
                        {order.shippingAddress.line2}
                        <br/>
                        Código Postal: {order.shippingAddress.postal_code}
                        <br/>
                        Teléfono: {order.shippingAddress.phone}
                    </p>): ""}
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
                                const {id, name, price, imageURL, cartQuantity, desc} = cart
                                return (
                                    <>
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
                                    {desc.length > 0 && (
                                        <tr key={`${id}-descriptions`}>
                                            <td colSpan="6">
                                                <ul>
                                                    {desc.map((description, descIndex) => (
                                                        <li key={`${id}-description-${descIndex}`}><div className={styles.desc}><span>{`${descIndex + 1}.`}</span><p>{description}</p></div></li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                    </>
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