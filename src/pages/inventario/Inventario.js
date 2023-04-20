import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { db, storage } from "../../firebase/config";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";

const initialState = {
    proveedor: "",
    alimento: "",
    unidad: "",
    cantidad: "",
}

const Inventario = () => {
    const {id} = useParams()
    const [insertar, setInsertar] = useState(false);
    const [editar, setEditar] = useState(false);
    const {data} = useFetchCollection("stock");
    const products = useSelector(selectProducts)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data,
            })
        );        
    }, [dispatch, data]);


    const productEdit = products.find((item) => item.id === id)

    const [product, setProduct] = useState(() => {
        const newState = detectForm(id, 
            { ...initialState},
            productEdit)
            return newState
    })

    function detectForm(id, f1, f2) {
        if(id==="ADD"){
            return f1;
        }
        return f2
    }
    

    const confirmDelete = (id) => {
        Notiflix.Confirm.show(
            'Delete Product!!',
            'You are about to delete this product',
            'Delete',
            'Cancel',
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
            await deleteDoc(doc(db, "stock", id));
            const storageRef = ref(storage);
            await deleteObject(storageRef)
            toast.success("Product deleted succesfully.")
        }catch(error){
            toast.error(error.message)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };
    
    const addProduct = (e) => {
        e.preventDefault();
        try {
            const docRef = addDoc(collection(db, "stock"), {
                proveedor: product.proveedor,
                alimento: product.alimento,
                unidad: Number(product.unidad),
                cantidad: product.cantidad,
                createdAt: Timestamp.now().toDate(),
              });
              setProduct({...initialState});

              toast.success("Product uploaded successfully.")
        }catch(error){
            toast.error(error.message)
        }
    }


    const editProduct = (e) => {
        e.preventDefault();

        try {

            setDoc(doc(db, "stock", id), {
                proveedor: product.proveedor,
                alimento: product.alimento,
                unidad: Number(product.unidad),
                cantidad: product.cantidad,
                createdAt: productEdit.createdAt,
                editedAt: Timestamp.now().toDate(),
              });
              toast.success("Product Edited Successfully")
        }catch(error){
            toast.error(error.message);
        }
    }

    return(
        <>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <button className="btn btn-success" onClick={()=>
            setInsertar(true)
            }>Insertar</button>
        <br />
        {/* Saber si hay elementos en la tabla */}
        {products.length === 0 ? (
            <p>No product found.</p>
        ) : (
            <table border="1">
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Proveedor</th>
                        <th>Alimentos</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
            {products.map((product, index) =>{
                return (
                    <tr key={product.id}>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            {product.proveedor}
                        </td>
                        <td>
                            {product.alimento}
                        </td>
                        <td>
                            {product.unidad}
                        </td>
                        <td>
                            {product.cantidad}
                        </td>
                        <td>
                            <FaEdit size={20} color="green" onClick={()=> setEditar(true)}/>
                            &nbsp;
                            <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(product.id)}/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        )}
        
        <Modal isOpen={insertar===true}>
        <ModalHeader>Insertar Registro</ModalHeader>
        <form onSubmit={addProduct}>
        <ModalBody>
            <div className="form-group">
            <label>Proveedor: </label>
            <br />
            <input type="text" className="form-control" name="proveedor" onChange={(e) => handleInputChange(e)}/>
            <br />
            <label>Alimento: </label>
            <br />
            <input type="text" className="form-control" name="alimento" onChange={(e) => handleInputChange(e)}/>
            <br />
            <label>Unidad: </label>
            <br />
            <input type="text" className="form-control" name="unidad" onChange={(e) => handleInputChange(e)}/>
            <br />
            <label>Cantidad: </label>
            <br />
            <input type="text" className="form-control" name="cantidad" onChange={(e) => handleInputChange(e)}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" type="submit">Insertar</button>{"   "}
            
        </ModalFooter>
        </form>
        <button className="btn btn-danger" onClick={()=>
                setInsertar(false)
                }>Cancelar</button>
        </Modal>


        <Modal isOpen={editar===true}>
        
        <ModalHeader>Editar Registro</ModalHeader>
        <form onSubmit={addProduct}>
        <ModalBody>
            <div className="form-group">
            <label>Proveedor: </label>
            <br />
            <input type="text" className="form-control" name="proveedor" onChange={(e) => handleInputChange(e)}/>
            <br />
            <label>Alimento: </label>
            <br />
            <input type="text" className="form-control" name="alimento" onChange={(e) => handleInputChange(e)}/>
            <br />
            <label>Unidad: </label>
            <br />
            <input type="text" className="form-control" name="unidad" onChange={(e) => handleInputChange(e)}/>
            <br />
            <label>Cantidad: </label>
            <br />
            <input type="text" className="form-control" name="cantidad" onChange={(e) => handleInputChange(e)}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>editProduct()}>Editar</button>{"   "}
            </ModalFooter>
        </form>
        <button className="btn btn-danger" onClick={()=>
                setInsertar(false)
                }>Cancelar</button>
        </Modal>
        </>
    )
}

export default Inventario;