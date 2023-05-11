import { deleteDoc, doc} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import styles from "./ViewProducts.module.css";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
    const  [search, setSearch] = useState("")
    const {data, isLoading} = useFetchCollection("products");
    const products = useSelector(selectProducts)
    const filteredProducts = useSelector(selectFilteredProducts)
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(10)
    //Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data,
            })
        );        
    }, [dispatch, data]);

    useEffect(() =>{
        dispatch(FILTER_BY_SEARCH({products, search}))
    },[dispatch, products, search])

    const confirmDelete = (id, imageURL) => {
        Notiflix.Confirm.show(
            'Borrar Producto!!',
            'Estás a punto de borrar este producto',
            'Borrar',
            'Cancelar',
            function okCb() {
              deleteProduct(id, imageURL)
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

    const deleteProduct = async(id, imageURL) => {
        try{
            await deleteDoc(doc(db, "products", id));

            const storageRef = ref(storage, imageURL);
            await deleteObject(storageRef)
            toast.success("Producto borrado correctamente.")
        }catch(error){
            toast.error(error.message)
        }
    }
    return (
        <>
        {isLoading && <Loader/>}
        <div className={styles.table}>
            <h2>Todos los productos</h2>

            <div className={styles.search}>
                <p>
                    <b>{filteredProducts.length}</b> productos encontrados
                </p>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            {filteredProducts.length === 0 ? (
                <p>No se encontraron productos.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentProducts.map((product, index) =>{
                        const {id, name, price, imageURL, category} = product;
                        return (
                            <tr key={id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                     <img src={imageURL} alt={name} style={{width: "100px"}}/>
                                </td>
                                <td>
                                    {name}
                                </td>
                                <td>
                                    {category}
                                </td>
                                <td>
                                    {`$${price}`}
                                </td>
                                <td className={styles.icons}>
                                    <Link to={`/admin/add-product/${id}`}>
                                        <FaEdit size={20} color="green"/>
                                    </Link>
                                    &nbsp;
                                    <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
            <Pagination
             currentPage={currentPage}
             setCurrentPage={setCurrentPage}
             productsPerPage={productsPerPage}
             totalProducts={filteredProducts.length}
            />
        </div>
        </>
    )
}

export default ViewProducts;