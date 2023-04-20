import React from 'react'
import styles from "./NotFound.module.css"
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={styles["not-found"]}>
            <div>
                <h2>404</h2>
                <p>Upppps, página no encontrada</p>
                <button className="--btn">
                    <Link to="/">
                        &larr; Volver a página principal
                    </Link>
                    </button>
            </div>
        </div>
    )
}

export default NotFound