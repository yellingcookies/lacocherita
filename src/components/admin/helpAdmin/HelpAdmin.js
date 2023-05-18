import React from "react";
import styles from "./HelpAdmin.module.css"

const Orders = () => {
    
    return (
        <section>
            <h2>Agregar y editar productos</h2>
            <p>A través de la barra de navegación a la izquierda, el admin puede acceder a la página "Agregar Productos"en la que deberá llenar todos los datos para agregar productos. D</p>
            <p>Desde la página "Todos los productos" el admin podrá ver todos los productos que hay actualmente en la tienda y tendrá la opción de editarlos o borrarlos.</p>
            <h2>Actualizar ordenes</h2>
            <p>Desde la página "Ordenes", el admin podrá ver todas las ordenes que se han hecho y podrá editar el estado de estas para de esta forma, marcarlas como completadas una vez se realice el pago en el restaurante.</p>
            <h2>Registrar Admin</h2>
            <p>Desde esta página, el admin podrá agregar usuarios de tipo empleado, los cuales tendrán privilegios para poder ver y actualizar las ordenes del restaurante.</p>
        </section>
    );
}

export default Orders;