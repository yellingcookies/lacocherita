import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEmail, selectRol } from '../../redux/slice/authSlice';

const EmployeeOnlyRoute = ({children}) => {
    const userRol = useSelector(selectRol);
    if(userRol === "employee"){
        return children;
    }
    return (
        <section style={{height: "80vh"}}>
            <div>
                <h2>Permiso Denegado.</h2>
                <p>Esta página solo puede ser visualizada por empleados.</p>
                <br/>
                <Link to="/">
                <button className="--btn">&larr; Regresar a inicio</button>
                </Link>
            </div>
        </section>
    );
};

export const EmployeeOnlyLink = ({children}) => {
    const userRol = useSelector(selectRol);
    if(userRol === "employee"){
        return children;
    }
    return null;
};

export default EmployeeOnlyRoute;