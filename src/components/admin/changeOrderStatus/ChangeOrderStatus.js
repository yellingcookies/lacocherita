import React, { useState } from "react"
import Loader from "../../loader/Loader"
import Card from "../../card/Card"
import styles from "./ChangeOrderStatus.module.css"
import { Timestamp, collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ChangeOrderStatus = ({order, id}) => {

    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const editOrder = (e, id) => {
        e.preventDefault()
        setIsLoading(true)

        const orderConfig = {
            userID: order.userID,
            userEmail: order.userEmail,
            orderDate: order.orderDate,
            orderTime: order.orderTime,
            orderAmount: order.orderAmount,
            orderStatus: status,
            cartItems: order.cartItems,
            //shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            editedAt: Timestamp.now().toDate(),
        }
        try {
            setDoc(doc(db, "orders", id), orderConfig);
            setIsLoading(false)
            toast.success("Estado de la orden cambiado correctamente")
            navigate("/admin/orders")
        }catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
      }

    return <>
        {isLoading && <Loader/>}
        <div className={styles.status}> 
            <Card cardClass={styles.card}>
                <h4>Actualizar estatus</h4>
                <form onSubmit={(e) => editOrder(e, id)}>
                    <span>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="" disabled>-- Elija uno --</option>
                            <option value="Order Placed...">Orden Realizada...</option>
                            <option value="Processing...">Procesando...</option>
                            <option value="Shipped...">Enviada...</option>
                            <option value="Delivered">Entregada...</option>
                        </select>
                    </span>
                    <span>
                        <button type="submit" className="--btn --btn-primary">Actualizar estatus</button>
                    </span>
                </form>
            </Card>
        </div>
    </>
}

export default ChangeOrderStatus