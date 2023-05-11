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
import styles from "./AddProduct.module.css";

const categories = [
    {id: 1, name: "Comida"},
    {id: 1, name: "Acompañamiento"},
    {id: 1, name: "Postre"},
    {id: 1, name: "Bebida"},
]; 

const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
}

const AddProducts = () => {
    const {id} = useParams()
    const products = useSelector(selectProducts)  
    const productEdit = products.find((item) => item.id === id)
    
    const [product, setProduct] = useState(() => {
        const newState = detectForm(id, 
            { ...initialState},
            productEdit)
            return newState
    })
  
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function detectForm(id, f1, f2) {
        if(id==="ADD"){
            return f1;
        }
        return f2
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  },
  (error) => {
    toast.error(error.message);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProduct({...product, imageURL: downloadURL});
      toast.success("Imagen subida correctamente.");
    });
  }
);

    };

    const addProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const docRef = addDoc(collection(db, "products"), {
                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: Timestamp.now().toDate(),
              });
              setIsLoading(false);
              setUploadProgress(0);
              setProduct({...initialState});

              toast.success("Producto subido correctamente.")
              navigate("/admin/all-products");
        }catch(error){
            setIsLoading(false);
            toast.error(error.message)
        }
    }
    const editProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(product.imageURL !== productEdit.imageURL){
            const storageRef = ref(storage, productEdit.imageURL);
            deleteObject(storageRef)
        }

        try {

            setDoc(doc(db, "products", id), {
                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: productEdit.createdAt,
                editedAt: Timestamp.now().toDate(),
              });

              setIsLoading(false);
              toast.success("Producto Editado Correctamente")
              navigate("/admin/all-products")
        }catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <>
        {isLoading && <Loader/>}
        <div className={styles.product}>
            <h2>{detectForm(id, "Agregar Nuevo Producto", "Editar Producto")}</h2>
            <Card cardClass={styles.card}>
                <form onSubmit={detectForm(id, addProduct, editProduct)}>
                <label>Product name:</label>
                <input type="text" placeholder="Nombre del producto" required name="name" value={product.name} onChange={(e) => handleInputChange(e)}/>
                <label>Imagen del producto:</label>
                <Card cardClass={styles.group}>
                    {uploadProgress === 0 ? null : (
                        <div className={styles.progress}>
                        <div className={styles["progress-bar"]} 
                        style={{width: `${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
                        </div>
                    </div>
                    )}
                    {/* accept o acceot */}
                    <input type="file" accept="image/*" placeholder="Imagen del producto" name="image" onChange= {(e) => handleImageChange(e)}/>
                        {product.imageURL === "" ? null : (
                            <input type="text"
                            placeholder="Image URL"  name="imageURL" value={product.imageURL} disabled/>
                        )}
                </Card>
                <label>Precio del Producto:</label>
                <input type="number" placeholder="Product/Brand" required name="price" value={product.price} onChange={(e) => handleInputChange(e)}/>
                <label>Categoría del Producto:</label>
                <select required name="category" value={product.category} onChange={(e) => handleInputChange(e)}>
                    <option value="" disabled>
                        -- Elegír Categoría --
                    </option>
                    {categories.map((cat) =>{
                        return (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        )
                    })};
                    </select>

                    <label>Horario del Producto:</label>
                    <input type="text" placeholder="Horario" required name="brand" value={product.brand} onChange={(e) => handleInputChange(e)}/>

                    <label>Descripción del producto:</label>
                    <textarea required name="desc" value={product.desc} cols="30" rows="10" onChange={(e) => handleInputChange(e)}/>

                    <button className="--btn --btn-primary">{detectForm(id, "Guardar Producto", "Editar Producto")}</button>
                </form>
            </Card>
        </div>
        </>
    )
}

export default AddProducts;