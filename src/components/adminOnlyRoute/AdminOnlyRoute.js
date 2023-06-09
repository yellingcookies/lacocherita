import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/slice/authSlice';

const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectEmail);
    if(userEmail === "admin@admin.com"){//123456
        return children;
    }
    return (
        <section style={{height: "80vh"}}>
            <div>
                <h2>Permiso Denegado.</h2>
                <p>Esta página solo puede ser visualizada por un administrador.</p>
                <br/>
                <Link to="/">
                <button className="--btn">&larr; Regresar a inicio</button>
                </Link>
            </div>
        </section>
    );
};

export const AdminOnlyLink = ({children}) => {
    const userEmail = useSelector(selectEmail);
    if(userEmail === "admin@admin.com"){
        return children;
    }
    return null;
};

export default AdminOnlyRoute;