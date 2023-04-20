import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import Card from '../card/Card'
import { Link } from 'react-router-dom'
import styles from "./CheckoutSummary.module.css"
const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)

    return (
        <div>
            <h3>Resumen de pago</h3>
            <div>
                {cartItems.length === 0 ? (
                    <>
                    <p>No hay productos en tu carrito.</p>
                    <button className="--btn">
                        <Link to="/#products">Volver a la tienda</Link>
                    </button>
                    </>
                ) : (
                    <div>
                        <p>
                            <b>{`Producto(s) en carrito: ${cartTotalQuantity}`}</b>
                        </p>
                        <div className={styles.text}>
                            <h4>Subtotal:</h4>
                            <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                        </div>
                        {cartItems.map((item, index) => {
                            const {id, name, price, cartQuantity} = item
                            return (
                                <Card key={id} cardClass={styles.card}>
                                    <h4>Producto: {name}</h4>
                                    <p>Cantidad: {cartQuantity}</p>
                                    <p>Precio unitario: {price}</p>
                                    <p>Precio conjunto: {price * cartQuantity}</p>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutSummary