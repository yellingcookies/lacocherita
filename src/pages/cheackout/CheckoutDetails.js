import React, { useState } from 'react'
import { CountryDropdown } from "react-country-region-selector"
import styles from "./CheckoutDetails.module.css"
import Card from "../../components/card/Card";
import { useDispatch } from 'react-redux'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';

const initialAddressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
}

const CheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
    const [billingAddress, setBillingAddress] = useState({...initialAddressState})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShipping = (e) => {
        const {name, value} = e.target
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        })
    }
    const handleBilling = (e) => {
        const {name, value} = e.target
        setBillingAddress({
            ...billingAddress,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        dispatch(SAVE_BILLING_ADDRESS(billingAddress))
        navigate("/checkout")
    }
    return(
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Detalles de pago</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <h3>Dirección de envío</h3>
                            <label>Nombre del destinatario</label>
                            <input type="text" placeholder="Nombre del destinatario" required name="name" value={shippingAddress.name} onChange={(e) => handleShipping(e)}/>
                            <label>Dirección</label>
                            <input type="text" placeholder="Dirección" required name="line1" value={shippingAddress.line1} onChange={(e) => handleShipping(e)}/>
                            <label>Número interior</label>
                            <input type="text" placeholder="Número interior" name="line2" value={shippingAddress.line2} onChange={(e) => handleShipping(e)}/>
                            <label>Ciudad</label>
                            <input type="text" placeholder="Ciudad" required name="city" value={shippingAddress.city} onChange={(e) => handleShipping(e)}/>
                            <label>Estado</label>
                            <input type="text" placeholder="Estado" required name="state" value={shippingAddress.state} onChange={(e) => handleShipping(e)}/>
                            <label>Código Postal</label>
                            <input type="text" placeholder="Código Postal" required name="postal_code" value={shippingAddress.postal_code} onChange={(e) => handleShipping(e)}/>
                            {/* COUNTRY INPUT*/}
                            <CountryDropdown className={styles.select} valueType="short" value={shippingAddress.country} defaultOptionLabel="Seleccione su país" onChange={(val) => handleShipping({
                                target: {
                                    name: "country",
                                    value: val,
                                }
                            })}/>
                            <label>Teléfono</label>
                            <input type="text" placeholder="Teléfono" required name="phone" value={shippingAddress.phone} onChange={(e) => handleShipping(e)}/>
                        </Card>
                        {/* BILLING ADDRESS */}
                        <Card cardClass={styles.card}>
                            <h3>Dirección de facturación</h3>
                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre" required name="name" value={billingAddress.name} onChange={(e) => handleBilling(e)}/>
                            <label>Dirección</label>
                            <input type="text" placeholder="Dirección" required name="line1" value={billingAddress.line1} onChange={(e) => handleBilling(e)}/>
                            <label>Número interior</label>
                            <input type="text" placeholder="Número interior" name="line2" value={billingAddress.line2} onChange={(e) => handleBilling(e)}/>
                            <label>Ciudad</label>
                            <input type="text" placeholder="Ciudad" required name="city" value={billingAddress.city} onChange={(e) => handleBilling(e)}/>
                            <label>Estado</label>
                            <input type="text" placeholder="Estado" required name="state" value={billingAddress.state} onChange={(e) => handleBilling(e)}/>
                            <label>Código Postal</label>
                            <input type="text" placeholder="Código Postal" required name="postal_code" value={billingAddress.postal_code} onChange={(e) => handleBilling(e)}/>
                            {/* COUNTRY INPUT*/}
                            <CountryDropdown className={styles.select} valueType="short" value={billingAddress.country} defaultOptionLabel="Seleccione su país" onChange={(val) => handleBilling({
                                target: {
                                    name: "country",
                                    value: val,
                                }
                            })}/>
                            <label>Teléfono</label>
                            <input type="text" placeholder="Teléfono" required name="phone" value={billingAddress.phone} onChange={(e) => handleBilling(e)}/>
                            <button type="submit" className="--btn --btn-primary">Proceder al pago</button>
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary/>
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CheckoutDetails