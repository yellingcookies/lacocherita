import React from "react";
import styles from "./auth.module.css";
import registerImg from "../../assets/register.png";
import {Link} from "react-router-dom";
import Card from "../../components/card/Card";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, seCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault()
        // console.log(email, password, cpassword)
        if (password !== cpassword){
            toast.error("Password do not match.")
        }
        else{
            setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setIsLoading(false);
            toast.success("Registration succesful");
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
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <input type="text" placeholder="Email" required 
                value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" required
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" required
                value={cpassword} onChange={(e) => seCPassword(e.target.value)}/>
                <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
            </form>
            <span className={styles.register}>
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </span>
        </div>
        </Card>
        <div className={styles.img}>
            <img src={registerImg} alt="Register" width="400"/>
        </div>
    </section>
    </>
    );    
};

export default Register;