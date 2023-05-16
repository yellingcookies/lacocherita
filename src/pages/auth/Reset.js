import {useState} from "react";
import React from "react";
import styles from "./auth.module.css";
import resetImg from "../../assets/forgot.png";
import {Link} from "react-router-dom";
import Card from "../../components/card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        alert(email);
        setIsLoading(true);

        sendPasswordResetEmail(auth, email).then(() =>{
            setIsLoading(false);
            toast.success("Revisa tu correo para el link de restablecimiento");
        }).catch((error) => {
            setIsLoading(false);
            toast.error("error.message");
        })
    };

    return(
        <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
            <img src={resetImg} alt="Reset Password" width="400"/>
        </div>
        <Card>
        <div className={styles.form}>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={resetPassword}>
                <input type="text" placeholder="Correo" required
                 value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button tyle="submit" className="--btn --btn-primary --btn-block">Restablecer Contraseña</button>
                <div className={styles.links}>
                    <p>
                        <Link to="/login">- Iniciar Sesión</Link>
                    </p>
                    <p>
                        <Link to="/register">- Registrarse</Link>
                    </p>
                </div>
            </form>
        </div>
        </Card> 
    </section>
    </>
    );
};

export default Reset;