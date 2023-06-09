import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useFetchDocument from "../../customHooks/useFetchDocument"
import spinnerImg from "../../assets/spinner.gif"
import styles from "./OrderDetails.module.css"
const OrderDetails = () => {
    const [order, setOrder] = useState(null)
    const {id} = useParams()
    const { document } = useFetchDocument("orders", id)

    useEffect(() => {
        setOrder(document)
    }, [document])

    return <section>
        <div className={`container ${styles.table}`}>
            <h2>Detalles de la orden</h2>
            <div>
                <Link to="/order-history">&larr; Regresar a ordenes</Link>
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
                        <b>Estatus de la orden</b> {order.orderStatus}
                    </p>

                    <p>
                        <b>Número de mesa</b> {order.table}
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
                                <th>Acción</th>
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
                                        <td className={styles.icons}>
                                            <Link to={`/review-products/${id}`}>
                                                <button className="--btn --btn-primary">
                                                    Reseñar producto
                                                </button>
                                            </Link>
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
                                    {/* {desc.length > 0 && (
                                        <tr key={`${id}-descriptions`}>
                                            <td colSpan="6">
                                                <ul>
                                                    {desc.map((description, descIndex) => (
                                                        <li key={`${id}-description-${descIndex}`}>{description}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )} */}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    </section>
}

export default OrderDetails