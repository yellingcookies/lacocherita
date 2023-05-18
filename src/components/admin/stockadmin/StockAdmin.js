import { deleteDoc, doc} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import styles from "./StockAdmin.module.css";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_INGREDIENTS, STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const StockAdmin = () => {
    const  [search, setSearch] = useState("")
    const {data, isLoading} = useFetchCollection("ingredientes");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            STORE_INGREDIENTS({
                ingredients: data,
            })
        );        
    }, [dispatch, data]);

    const confirmDelete = (id) => {
        Notiflix.Confirm.show(
            'Borrar Producto!!',
            'Estás a punto de borrar este producto',
            'Borrar',
            'Cancelar',
            function okCb() {
              deleteProduct(id)
            },
            function cancelCb() {
              console.log("Delete Canceled");
            },
            {
                //ESTILOS DE NOTIFICACION VIENEN DE LA DOCUMENTACION OFICIAL DE NOTIFLIX
              width: '320px',
              borderRadius: '3px',
              titleColor: "orangered",
                okButtonBackground: "orangered",
                cssAnimationStyle: "zoom"
            },
          );
    }

    const deleteProduct = async(id) => {
        try{
            await deleteDoc(doc(db, "ingredientes", id));
            toast.success("Producto borrado correctamente.")
        }catch(error){
            toast.error(error.message)
        }
    }
    return (
        <>
        {isLoading && <Loader/>}
        <div className={styles.table}>
            <h2>Inventario</h2>

            <div className={styles.search}>
                <p>
                    <b>{data.length}</b> productos encontrados
                </p>
            </div>
            {data.length === 0 ? (
                <p>No se encontraron productos.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((product, index) =>{
                        const {id, producto, cantidad, descripcion} = product;
                        return (
                            <tr key={id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {producto}
                                </td>
                                <td>
                                    {cantidad}
                                </td>
                                <td>
                                    {descripcion}
                                </td>
                                <td className={styles.icons}>
                                    <Link to={`/admin/add-stock/${id}`}>
                                        <FaEdit size={20} color="green"/>
                                    </Link>
                                    &nbsp;
                                    <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id)}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
            <br/>
            <Link to={`/admin/add-stock/ADD`}>
                <button className="--btn --btn-primary">Agregar</button>
            </Link>
        </div>
        </>
    )
}

export default StockAdmin;