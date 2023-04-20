import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
    return(
        <section>
            <div className="container">
                <h2>Pago completado</h2>
                <p>Gracias por su compra</p>
                <br/>
                
                    <button className="--btn --btn-primary">
                    <Link to="/order-history">Ver estatús de la orden</Link>
                        </button>
                
            </div>
        </section>
    )
}

export default CheckoutSuccess