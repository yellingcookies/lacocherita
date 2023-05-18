import React from "react";
import styles from "./Help.module.css";
import Card from "../../components/card/Card";

const Reset = () => {

    return(
        <section>
        <h2>Crear Cuenta</h2>
        <p>Para crear una cuenta simplemente debemos presionar la sección de iniciar sesión, se puede iniciar sesión simplemente con Google o registrarse en la pagina</p>
        <p>Al registrarnos simplemente nos pedirá ingresar nuestro correo y contraseña, una vez hecho esto se iniciará sesión automáticamente en el sitio</p>
        <p>En caso de que olvides tu contraseña, debes escribir tu correo de usuario y se te enviará automaticamente un correo para recuperar tu contraseña.</p>
        <h2>Añadir productos al carrito y enviar la orden</h2>
        <p>Primero bajamos en la página inicial del index para ver todos los productos del restaurante, ahí podremos seleccionar los productos que queramos consumir.</p> 
        <p>Al presionar un producto se abrirá una página donde veras el nombre del producto, su categoría y su precio. Podrás añadir el producto al carrito pulsando el botón de añadir al carrito y también podrás agregar alguna descripcion o detalles para este.</p>
        <p>Una vez añadido el producto podremos irnos al carrito para ver todos los productos de este, ver el subtotal del pedido y enviar la orden.</p>
        <p>Una vez enviada la orden, puedes visualizarla en la sección de Mis Ordenes, así mismo puedes seguir agregando productos a la orden actual hasta que se realice el pago en restaurante y el mesero la marque como completada.</p>

       </section>

    );
};

export default Reset;