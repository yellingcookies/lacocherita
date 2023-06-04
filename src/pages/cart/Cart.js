import React, { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css"
import {useDispatch, useSelector} from "react-redux";
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectEmail, selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice";
import { Timestamp, addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { selectOrderHistory } from "../../redux/slice/orderSlice";

const numbers = [
    {id: 1, name: "1"},
    {id: 1, name: "2"},
    {id: 1, name: "3"},
    {id: 1, name: "4"},
    {id: 1, name: "5"},
    {id: 1, name: "6"},
    {id: 1, name: "7"},
]; 

const initialState = {
    userID: "",
    userEmail: "",
    orderDate: "",
    orderTime: "",
    orderAmount: 0,
    orderStatus: "",
    cartItems: "",
    createdAt: ""
}

const Cart = () => {
    const {id} = useParams()
    const userID = useSelector(selectUserID)
    const userEmail = useSelector(selectEmail)
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const orders = useSelector(selectOrderHistory)
    const navigate = useNavigate()
    const orderEdit = orders.find((item) => item.id === id)
    var table = "";
    const number = useRef(null)
    console.log(id)

    const url = window.location.href;
    const ActualOrders = orders.filter((order) => order.orderStatus === "Orden Realizada..." && order.userID === userID)

    useEffect(() => {
        const redirection = () => {
            if(ActualOrders.length>0){
                if(url.includes("ADD")){
                    navigate("/")
                    return
                }
            }
        }; 
        redirection(); 
    }, [url])

    const [numero, setNumero] = useState({name:""})
    const [order, setOrder] = useState(() => {
        const newState = detectForm(id, 
            { ...initialState},
            orderEdit)
            return newState
    })

    function detectForm(id, f1, f2) {
        if(id==="ADD"){
            return f1;
        }
        else{
            return f2
        }
    }

    const handleInputChange = (e) => {
        const {value} = e.target;
        //table = value;
        setNumero({...numero, name: value});
    };

    const increaseCart = (cart) => {
        console.log(cart)
        dispatch(ADD_TO_CART(cart))
    };
    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart));
    };

    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart))
    }

    const clearCart = () => {
        dispatch(CLEAR_CART())
    };

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL())
        dispatch(CALCULATE_TOTAL_QUANTITY())
        dispatch(SAVE_URL(""))
    }, [dispatch, cartItems]);

    // const url = window.location.href

    const checkout = () => {
        if(isLoggedIn){
            navigate("/checkout-details")
        } else{
            dispatch(SAVE_URL(url))
            navigate("/login")
        }
    }

    const saveOrder = () => {
        if(isLoggedIn){
            if(numero.name===""){
                toast.error("Debes agregar número de mesa")
            }
            else{
                const today = new Date()
                const date = today.toDateString()
                const time = today.toLocaleTimeString()
                const orderConfig = {
                    userID,
                    userEmail,
                    orderDate: date,
                    orderTime: time,
                    orderAmount: cartTotalAmount,
                    orderStatus: "Orden Realizada...",
                    cartItems,
                    table: numero.name,
                    createdAt: Timestamp.now().toDate()
                }
                try {
                    addDoc(collection(db, "orders"), orderConfig);
                    dispatch(CLEAR_CART())
                    toast.success("Orden Guardada")
                    const a = orders[0].id
                    navigate(`/order-history`)
                }catch(error){
                    toast.error(error.message)
                }
            }
        } else{
            dispatch(SAVE_URL(url))
            navigate("/login")
        }
      }

      const editOrder = () => {
        if(isLoggedIn){
            try {
                //setDoc(doc(db, "orders", id), orderConfig)
                //addDoc(collection(db, "orders"), orderConfig);
                toast.success("Entró")
                updateDoc(doc(db, "orders", id), {
                    orderAmount: order.orderAmount + cartTotalAmount,
                    cartItems: arrayUnion(...cartItems)
                })
                dispatch(CLEAR_CART())
                toast.success("Orden Actualizada")
                const a = orders[0].id
                navigate(`/order-details/${a}`)
            }catch(error){
                toast.error(error.message)
            }
        } else{
            dispatch(SAVE_URL(url))
            navigate("/login")
        }
      }

    return <section>
        <div className={`container ${styles.table}`}>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <>
                    <p>Tu carrito está vacio.</p>
                    <br/>
                    <div>
                        <Link to="/#products">&larr; Continuar comprando</Link>
                    </div>
                </>
            ) : (
                <>
                {detectForm(id, <span>Numero de mesa</span>, "")}
                {/* {detectForm(id, <input type="number" placeholder="mesa" name="description" onChange={(e) => handleInputChange(e)} ref={number}/>, "")} */}
                {detectForm(id, <select required name="category" value={numero.name} onChange={(e) => handleInputChange(e)}>
                    <option value="">
                        -- Numero de mesa --
                    </option>
                    {numbers.map((cat) =>{
                        return (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        )
                    })};
                    </select>, "")}
                <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Productos</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((cart, index) =>{
                            const {id, name, price, imageURL, cartQuantity, desc} = cart;
                            return (
                                <>
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <p>
                                            <b>{name}</b>
                                        </p>
                                        <img src={imageURL} alt={name} style={{width: "100px"}}></img>
                                    </td>
                                    <td>{price}</td>
                                    <td>
                                        <div className={styles.count}>
                                            <button className="--btn" onClick={() => decreaseCart(cart)}>-</button>
                                            <p>
                                                <b>{cartQuantity}</b>
                                            </p>
                                            <Link to={`/product-details/${id}`}>
                                                {/* <button className="--btn" onClick={() => increaseCart(cart)}>+</button> */}
                                                <button className="--btn">+</button>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        {(price * cartQuantity).toFixed(2)}
                                    </td>
                                    <td className={styles.icons}>
                                        <FaTrashAlt size={19} color="red" onClick={() => removeFromCart(cart)}/>
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
                <div className={styles.summary}>
                    <button className="--btn --btn-danger" onClick={clearCart}>Limpiar Carrito</button>
                    <div className={styles.checkout}>
                        <div>
                            <Link to="/#products">&larr; Continuar comprando</Link>
                        </div>
                        <br/>
                            <Card cardClass={styles.card}>
                                <p><b>{`Producto(s) en carrito: ${cartTotalQuantity}`}</b></p>
                                <div className={styles.text}>
                                    <h4>Subtotal:</h4>
                                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                                </div>
                                {/* <p>Taxes and shipping calculated at checkout</p> */}
                                <button className="--btn --btn-primary --btn-block" onClick={checkout}>Pedir a Domicilio</button>
                                <button className="--btn --btn-danger" onClick={detectForm(id, saveOrder, editOrder)}>Pedir en restaurante</button>
                            </Card>
                    </div>
                </div>
                </>
            )}
        </div>
    </section>
};

export default Cart;