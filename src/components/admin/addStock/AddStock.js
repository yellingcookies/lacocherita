import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { selectProducts } from "../../../redux/slice/productSlice";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddStock.module.css";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const initialState = {
    producto: "",
    cantidad: "",
    descripcion: ""
}

const AddStock = () => {
    const {data, isLoading} = useFetchCollection("ingredientes");
    console.log(data)
    const {id} = useParams()

    function detectForm(id, f1, f2) {
        if(id==="ADD"){
            return f1;
        }
        return f2
    }
    const productEdit = data.find((item) => item.id === id)
    console.log(productEdit)
    const [product, setProduct] = useState(() => {
        const newState = detectForm(id, 
            { ...initialState},
            productEdit)
            return newState
    })

    const [isLoadingb, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const addProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const docRef = addDoc(collection(db, "ingredientes"), {
                producto: product.producto,
                cantidad: product.cantidad,
                descripcion: product.descripcion,
                createdAt: Timestamp.now().toDate(),
              });
              setIsLoading(false);
              setProduct({...initialState});

              toast.success("Producto subido correctamente.")
              navigate("/admin/stock");
        }catch(error){
            setIsLoading(false);
            toast.error(error.message)
        }
    }
    const editProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            setDoc(doc(db, "ingredientes", id), {
                producto: product.producto,
                cantidad: product.cantidad,
                descripcion: product.descripcion,
                createdAt: productEdit.createdAt,
                editedAt: Timestamp.now().toDate(),
              });

              setIsLoading(false);
              toast.success("Producto Editado Correctamente")
              navigate("/admin/stock")
        }catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <>
        {isLoadingb && <Loader/>}
        <div className={styles.product}>
            <h2>{detectForm(id, "Agregar Nuevo Producto", "Editar Producto")}</h2>
            <Card cardClass={styles.card}>
                <form onSubmit={detectForm(id, addProduct, editProduct)}>
                <label>Nombre del producto:</label>
                <input type="text" placeholder="Nombre del producto" required name="producto" value={product.producto} onChange={(e) => handleInputChange(e)}/>
                <label>Cantidad del producto:</label>
                <input type="text" placeholder="Cantidad del producto" required name="cantidad" value={product.cantidad} onChange={(e) => handleInputChange(e)}/>
                    <label>Descripción del producto:</label>
                    <input type="text" placeholder="Descripción" required name="descripcion" value={product.descripcion} onChange={(e) => handleInputChange(e)}/>

                    <button className="--btn --btn-primary">{detectForm(id, "Guardar Producto", "Editar Producto")}</button>
                </form>
            </Card>
        </div>
        </>
    )
}

export default AddStock;