import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../../../firebase/config';
import Loader from '../../loader/Loader';
import Card from '../../card/Card';
import registerImg from "../../../assets/register.png";
import styles from "./RegisterAdmin.module.css";
import { doc, setDoc } from 'firebase/firestore';

function RegisterAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, seCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault()
        // console.log(email, password, cpassword)
        if (password !== cpassword){
            toast.error("Las contraseñas no coinciden.")
        }
        else{
            setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setDoc(doc(db, `usuarios/${userCredential.user.uid}`), {
                correo: email,
                rol: "employee"
              });
            const user = userCredential.user;
            console.log(user);
            setIsLoading(false);
            toast.success("Registrado Correctamente");
            navigate("/login");
        })
        .catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
            // ..
        });
        }
    };
    return(
        <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
        <Card>
        <div className={styles.form}>
            <h2>Registrar Empleados</h2>
            <form onSubmit={registerUser}>
                <input type="text" placeholder="Correo" required 
                value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" required
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirmar Contraseña" required
                value={cpassword} onChange={(e) => seCPassword(e.target.value)}/>
                <button type="submit" className="--btn --btn-primary --btn-block">Registrarse</button>
            </form>
            <span className={styles.register}>
                <p>¿Ya tiene una cuenta?</p>
                <Link to="/login"> Iniciar Sesión</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
  )
}

export default RegisterAdmin