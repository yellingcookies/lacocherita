import { deleteDoc, doc } from "firebase/firestore";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./Inventario.module.css"
import { db, storage } from "../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import Notiflix from "notiflix";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";

const initialState = {
    producto: "",
    createdAt: "",
}

const Inventario = () => {
    //const [product, setProduct] = useState({...initialState})
    const [formData, setFormData] = useState([]);
    const {data, isLoading} = useFetchCollection("ingredientes");
    console.log(data)

    const confirmDelete = (id, imageURL) => {
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
            await deleteDoc(doc(db, "products", id));
            toast.success("Producto borrado correctamente.")
        }catch(error){
            toast.error(error.message)
        }
    }
    const hola = "producto";
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        // name = value;
        // console.log(product.producto)
        // setProduct({[`${hola}`]: value});
        // console.log(product.producto)
    };

    return(
        <>
        {isLoading && <Loader/>}
        <h2>Inventario</h2>
        <div className={styles.table}>
            <table>
                <thead>
                    
                    <tr>
                        <th>id</th>
                        <th>producto</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ingrediente, index) =>{
                        {console.log("Hola")}
                        const {id, producto} = ingrediente;
                        return(
                            <tr key={id}>
                                <form>
                                <td><input type="text" name="id" value={index + 1} onChange={(e) => handleInputChange(e)} readOnly/></td>  
                                </form>
                                <td><input type="text" name="producto" placeholder={producto} onChange={(e) => handleInputChange(e)}/></td>  
                                <td><input type="submit"/></td>
                            </tr>
                            
                        )
                    })}
                    <form>
                    <tr>
                        <td>aa</td>
                        <td>s</td>
                        <td></td>
                    </tr>
                    </form>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Inventario;