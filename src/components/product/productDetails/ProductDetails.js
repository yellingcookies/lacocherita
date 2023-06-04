import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import styles from "./ProductDetails.module.css"
import spinnerImg from "../../../assets/spinner.gif"
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const { document } = useFetchDocument("products", id)
    const { data } = useFetchCollection("reviews")
    const filteredReviews = data.filter((review) => review.productID === id)
    //this.descr = React.createRef()
    const descr = useRef(null)
    const cart = cartItems.find((cart) => cart.id === id)
    var desc = ""

    const isCartAdded = cartItems.findIndex((cart) => {
        return cart.id === id
    })

    const handleInputChange = (e) => {
        const {value} = e.target;
        desc = value;
        //setProduct({...product, [name]: value});
    };

    useEffect(() => {
        setProduct(document)
    }, [document]);

    const addToCart = (product) => {
        //var txtDesc = document.getElementByid("descr")
        //txtDesc.value=""
        //this.descr.value=""
        descr.current.value = ""
        dispatch(ADD_TO_CART({ product, desc}))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    };

    const decreaseCart = (product) => {
        dispatch(DECREASE_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    };


    return (
        <section>
            <div className={`container ${styles.product}`}>
                <h2>Detalles del Producto</h2>
                <div>
                    <Link to="/#products">&larr; Regresar a Productos</Link>
                </div>
                {product === null ? (
                    <img src={spinnerImg} alt="Loading" style={{width: "50px"}}/>
                ) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                <img src={product.imageURL} alt={product.name}/>
                            </div>
                            <div className={styles.content}>
                                <h3>{product.name}</h3>
                                <p className={styles.price}>{`$${product.price}`}</p>
                                <p>{product.desc}</p>
                                <p>
                                    <b>SKU</b> {product.id}
                                </p>
                                <p>
                                    <b>Horario</b> {product.brand}
                                </p>
                                {/* <input type="text" placeholder="Descripción" name="description" onChange={(e) => handleInputChange(e)} ref={descr}/> */}
                                <label>Detalles:</label><br/>
                                <textarea required placeholder="Agregue ingredientes o cualquier detalle específico para este alimento" name="description"  cols="30" rows="10" onChange={(e) => handleInputChange(e)} ref={descr}/>
                                <div className={styles.count}>
                                    {isCartAdded < 0 ? null : (
                                        <>
                                            <button className="--btn" onClick={() => decreaseCart(product)}>-</button>
                                            <p>
                                                <b>{cart.cartQuantity}</b>
                                            </p>
                                            <button className="--btn" onClick={() => addToCart(product)}>+</button>
                                        </>
                                    )}
                                </div>
                                <button className="--btn --btn-danger" onClick={() => addToCart(product)}>AGREGAR A CARRITO</button>
                            </div>
                        </div>
                    </>
                )}
                <Card cardClass={styles.card}>
                    <h3>Reseñas del producto</h3>
                    <div>
                        {filteredReviews.length === 0 ? (
                            <p>No hay reseñas para este producto</p>
                        ): (
                            <>
                                {filteredReviews.map((item, index) => {
                                    const {rate, review, reviewDate, userName} = item
                                    return (
                                        <div key={index} className={styles.review}>
                                            <StarsRating value={rate} />
                                            <p>{review}</p>
                                            <span>
                                                <b>{reviewDate}</b>
                                            </span>
                                            <br/>
                                            <span>
                                                <b>Por: {userName}</b>
                                            </span>
                                        </div>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </section>
     );
}
export default ProductDetails