import {useState} from "react";
import styles from "./auth.module.css";
import loginImg from "../../assets/login.png";
import {Link} from "react-router-dom";
import {FaGoogle} from "react-icons/fa";
import Card from "../../components/card/Card";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const previousURL = useSelector(selectPreviousURL)
    const navigate = useNavigate();

    const redirectUser = () => {
        if(previousURL.includes("cart")){
            return navigate("/cart")
        }else{
            navigate("/")
        }
    }


    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // const user = userCredential.user;
            setIsLoading(false);
            toast.success("Inicio de sesión completado...")
            redirectUser()
        }) 
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
        });
        console.log(email, password);
    }

    // Login with Google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    // const user = result.user;
    toast.success("Inicio de sesión completado");
    redirectUser()
  }).catch((error) => {
    toast.error(error.message);
  });
    };
    // Container está en index.css por lo que va afuera y auth está dentro de auth.module.css por lo que va dentro
    return( 
        <>
        {isLoading && <Loader/>}
        <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={loginImg} alt="Login" width="400"/>
        </div>

        <Card>
        <div className={styles.form}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={loginUser}>
                <input type="text" placeholder="Correo" required
                value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" required
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button button="submit" className="--btn --btn-primary --btn-block">Iniciar Sesión</button>
                <div className={styles.links}>
                    <Link to="/reset">¿Olvidaste tu contraseña?</Link>
                </div>
            <p>-- o --</p>
            </form>
            <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}><FaGoogle color="#fff"/> Iniciar con Google</button>
            <span className={styles.register}>
                <p>¿No tienes una cuenta?</p>
                <Link to="/register">Registrarse</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
)};

export default Login;