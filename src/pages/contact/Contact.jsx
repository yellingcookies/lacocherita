import {useRef} from "react";
import styles from "./Contact.module.css"
import Card from "../../components/card/Card";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import {GoLocation} from "react-icons/go"
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const Contact = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_of2zy8f', form.current, 'jFAtctwh_6vDOpsLB')
          .then((result) => {
            toast.success("El mensaje fue envíado correctamente")
          }, (error) => {
            toast.error(error.text)
          });
          e.target.reset()
      };

    return (
        <section>
            <div className={`container ${styles.contact}`}>
                <h2>Contactanos</h2>
                <div className={styles.section}>
                    <form ref={form} onSubmit={sendEmail}>
                        <Card cardClass={styles.card}>
                            <label>Nombre</label>
                            <input type="text" name="user_name" placeholder="Nombre Completo" required></input>
                            <label>Correo</label>
                            <input type="email" name="user_email" placeholder="Tu correo" required></input>
                            <label>Asunto</label>
                            <input type="text" name="subject" placeholder="Asunto" required></input>
                            <label>Mensaje</label>
                            <textarea name="message" cols="30" rows="10"></textarea>
                            <button className="--btn --btn-primary">Mandar Mensaje</button>
                        </Card>
                    </form>

                    <div className={styles.details}>
                        <Card cardClass={styles.card2}>
                            <h3>Nuestra información de contacto</h3>
                            <p>Llena el formulario o contactanos por otro de los medios listados abajo</p>
                            <div className={styles.icons}>
                                <span>
                                    <FaPhoneAlt/>
                                    <p>33 2031 4405</p>
                                </span>
                                <span>
                                    <FaEnvelope/>
                                    <p>lacocheritaceti@gmail.com</p>
                                </span>
                                <span>
                                    <GoLocation/>
                                    <p>Tonalá, Jalisco</p>
                                </span>
                                <span>
                                    <FaTwitter/>
                                    <p>@LaCocheritaCeti</p>
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Contact;