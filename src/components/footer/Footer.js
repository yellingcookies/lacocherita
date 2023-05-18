import React, { useEffect } from "react";
import styles from "./Footer.module.css"
import { AiFillFacebook } from "react-icons/ai";
import { SiWhatsapp } from "react-icons/si";
import { SiInstagram } from "react-icons/si";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
    const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

    useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
        // Prevent the mini-infobar from appearing on mobile.
        event.preventDefault();
        console.log("👍", "beforeinstallprompt", event);
        // Stash the event so it can be triggered later.
        window.deferredPrompt = event;
        // Remove the 'hidden' class from the install button container.
        setIsReadyForInstall(true);
    });
    }, []);

    async function downloadApp() {
        console.log("👍", "butInstall-clicked");
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
          // The deferred prompt isn't available.
          console.log("oops, no prompt event guardado en window");
          return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        const result = await promptEvent.userChoice;
        console.log("👍", "userChoice", result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        setIsReadyForInstall(false);
      }

      return <div className={styles.footer}>


<div className={styles.footercounter}>
        <h3>Sobre Nosotros</h3>
        <br/>
        <p>Somos una cafeteria ecepcional con el objetivo de brindarle a nuestros comensales la mejor calidad en todos nuestros productos</p>
        <br/>
        <ul className={styles.socials}>
        <li><AiFillFacebook size={28}/></li>
           <li><SiInstagram size={28}/></li>
            <li><SiWhatsapp size={28}/></li> 
            <li><a href="/contact">Contactanos</a></li>
          <li><a href="/help">Ayuda</a></li> 
        </ul>
        <div className={styles.footerbottom}>
        <p>Restaurant Plus  &copy; {year} All Rights Reserved</p>
        {isReadyForInstall && <center><button className="--btn --btn-primary" onClick={downloadApp}>Descargar aplicación móvil</button></center>}
        
    </div>
    </div>
   

        
    </div>;
};


export default Footer;