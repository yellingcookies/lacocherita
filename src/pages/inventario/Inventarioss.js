// import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
// import { deleteObject, ref } from "firebase/storage";
// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// // import styles from "../../components/viewProducts/ViewProducts.module.css";
// import styles from "./Inventario.module.css"
// import { useDispatch, useSelector } from "react-redux";
// import Notiflix from "notiflix";
// import { db, storage } from "../../firebase/config";
// import Loader from "../../components/loader/Loader";
// import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
// import useFetchCollection from "../../customHooks/useFetchCollection";

// const Inventario = () => {
//     const {data, isLoading} = useFetchCollection("products");
//     const products = useSelector(selectProducts)

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(
//             STORE_PRODUCTS({
//                 products: data,
//             })
//         );        
//     }, [dispatch, data]);

//     const confirmDelete = (id, imageURL) => {
//         Notiflix.Confirm.show(
//             'Delete Product!!',
//             'You are about to delete this product',
//             'Delete',
//             'Cancel',
//             function okCb() {
//               deleteProduct(id, imageURL)
//             },
//             function cancelCb() {
//               console.log("Delete Canceled");
//             },
//             {
//                 //ESTILOS DE NOTIFICACION VIENEN DE LA DOCUMENTACION OFICIAL DE NOTIFLIX
//               width: '320px',
//               borderRadius: '3px',
//               titleColor: "orangered",
//                 okButtonBackground: "orangered",
//                 cssAnimationStyle: "zoom"
//             },
//           );
//     }

//     const deleteProduct = async(id, imageURL) => {
//         try{
//             await deleteDoc(doc(db, "products", id));

//             const storageRef = ref(storage, imageURL);
//             await deleteObject(storageRef)
//             toast.success("Product deleted succesfully.")
//         }catch(error){
//             toast.error(error.message)
//         }
//     }
//     return (
//         <>
//         {isLoading && <Loader/>}
//         <div className={styles.table}>
//             <h2>All Products</h2>

//             {products.length === 0 ? (
//                 <p>No product found.</p>
//             ) : (
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>s/n</th>
//                         <th>Image</th>
//                         <th>Name</th>
//                         <th>Category</th>
//                         <th>Price</th>
//                         <th>Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {products.map((product, index) =>{
//                         const {id, name, price, imageURL, category} = product;
//                         return (
//                             <tr key={id}>
//                                 <td>
//                                     {index + 1}
//                                 </td>
//                                 <td>
//                                      <img src={imageURL} alt={name} style={{width: "100px"}}/>
//                                 </td>
//                                 <td>
//                                     {name}
//                                 </td>
//                                 <td>
//                                     {category}
//                                 </td>
//                                 <td>
//                                     {`$${price}`}
//                                 </td>
//                                 <td className={styles.icons}>
//                                     <Link to={`/admin/add-product/${id}`}>
//                                         <FaEdit size={20} color="green"/>
//                                     </Link>
//                                     &nbsp;
//                                     <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)}/>
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//         </>
//     )
// };

// export default Inventario;


import React, { Component, useEffect, useState } from "react";
import "./Inventario.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { auth, db, storage } from "../../firebase/config";
import Notiflix from "notiflix";
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts,  STORE_PRODUCTS } from "../../redux/slice/productSlice";
import styles from "./Inventario.module.css"
import useFetchCollection from "../../customHooks/useFetchCollection";

const Inventario = () => {
  const {id} = useParams()
  const [uploadProgress, setUploadProgress] = useState(0);
    // const [isLoading, setIsLoading] = useState(false);
    const [insertar, setInsertar] = useState(false);
    const productEdit = products.find((item) => item.id === id)
    const [editar, setEditar] = useState(false);

    const {data, isLoading} = useFetchCollection("products");
    const products = useSelector(selectProducts)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data,
            })
        );        
    }, [dispatch, data]);
    
  //   const [product, setProduct] = useState(() => {
  //     const newState = detectForm(id, 
  //         { ...initialState},
  //         productEdit)
  //         return newState
  // })

//   function detectForm(id, f1, f2) {
//     if(id==="ADD"){
//         return f1;
//     }
//     return f2
// }

    const initialState = {
      proveedor: "",
      alimento: "",
      unidad: "",
      cantidad: "",
  }
    // const [product, setProduct] = useState({
    //     data: [],
    //     modalInsertar: false,
    //     modalEditar: false,
    //     form:{
    //       canal: '',
    //       idioma: '',
    //       pais: '',
    //       suscriptores: ''
    //     },
    //     id: 0
    //   });
    const [product, setProduct] = useState({
        proveedor: '',
        alimento: '',
        unidad: '',
        cantidad: '',
    });

    //   const modalInsertar=()=>{
    //     setInsertar(true);
    //     console.log(tema);
    //  }
    
      // const peticionGet = () => {
      //   auth.child("canales").on("value", (canal) => {
      //     if (canal.val() !== null) {
      //       setProduct({ ...product.data, data: canal.val() });
      //     } else {
      //       setProduct({ data: [] });
      //     }
      //   });
      // };
    
      // const peticionPost=()=>{
      //   // auth.child("canales").push(product.form,
      //   //   error=>{
      //     auth.child("canales").push(product,
      //       error=>{
      //       if(error)console.log(error)
      //     });
      //   //   setProduct({modalInsertar: false});
      //     setInsertar(false);
      // }
    
      // const peticionPut=()=>{
      //   // auth.child(`canales/${product.id}`).set(
      //   //   product.form,
      //   //   error=>{
      //     auth.child(`canales/${product.id}`).set(
      //       product,
      //       error=>{
      //       if(error)console.log(error)
      //     });
      //   //   setProduct({modalEditar: false});
      //   setEditar(false);
      // }
    
      // const peticionDelete=()=>{
      //   if(window.confirm(`Estás seguro que deseas eliminar el canal ${product.form && product.form.canal}?`))
      //   {
      //   auth.child(`canales/${product.id}`).remove(
      //     error=>{
      //       if(error)console.log(error)
      //     });
      //   }
      // }

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
    
      // const handleChange=(e)=>{
      //   setProduct({form:{
      //     ...product.form,
      //     [e.target.name]: e.target.value
      //   }})
      //   console.log(product.form);
      // }

      const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };
      const seleccionarCanal=async(canal, id, caso)=>{
    
        await setProduct({form: canal, id: id});
    
        (caso==="Editar")?
        // setProduct({modalEditar: true})
        setEditar(true)
        :confirmDelete()
    
      }

      const addProduct = (e) => {
        e.preventDefault();
        //console.log(product);
        // setIsLoading(true);

        try {
            const docRef = addDoc(collection(db, "stock"), {
                proveedor: product.proveedor,
                alimento: product.alimento,
                unidad: product.unidad,
                cantidad: product.cantidad,
                createdAt: Timestamp.now().toDate(),
              });
              // setIsLoading(false);
              setUploadProgress(0);
              setInsertar(false);
              setProduct({...initialState});

              toast.success("Product uploaded successfully.")
        }catch(error){
            toast.error(error.message)
        }
    }



    const editProduct = (e) => {
      e.preventDefault();
      // setIsLoading(true);

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

            // setIsLoading(false);
            toast.success("Product Edited Successfully")
            // Navigate("/admin/all-products")
      }catch(error){
          // setIsLoading(false);
          toast.error(error.message);
      }
  }
    
      // const componentDidMount=()=>{
      //   peticionGet();
      // }
      
    return (
      <>
        <div className="App">
        <br />
        <button className="btn btn-success" onClick={()=>
            // setProduct({modalInsertar: true})
            setInsertar(true)
            }>Insertar</button>
        <br />
        <br />
        {products.length === 0 ? (
                <p>No product found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Proveedor</th>
                        <th>Alimentos</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) =>{
                        const {id, proveedor, alimento, unidad, cantidad} = product;
                        return (
                            <tr key={id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {proveedor}
                                </td>
                                <td>
                                    {alimento}
                                </td>
                                <td>
                                    {unidad}
                                </td>
                                <td>
                                    {cantidad}
                                </td>
                                <td className={styles.icons}>
                                        <FaEdit size={20} color="green" onClick={()=> setEditar(true)}/>
                                    &nbsp;
                                    <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id)}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )};
        {/* // <table className="table table-bordered">
        //   <thead>
        //     <tr>
        //       <th>Id</th>
        //       <th>Proveedor</th>
        //       <th>Alimento</th>
        //       <th>Unidad</th>
        //       <th>Cantidad</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {Object.keys(product.data).map(i=>{ */}
        {/* //      // console.log(i);
        //       return <tr key={i}>
        //         <td>{product.data[i].canal}</td>
        //         <td>{product.data[i].idioma}</td>
        //         <td>{product.data[i].pais}</td>
        //         <td>{product.data[i].suscriptores}</td>
        //         <td>
        //           <button className="btn btn-primary" onClick={()=>seleccionarCanal(product.data[i], i, 'Editar')}>Editar</button> {"   "}
        //           <button className="btn btn-danger" onClick={()=>seleccionarCanal(product.data[i], i, 'Eliminar')}>Eliminar</button>
        //         </td>

        //       </tr>
        //     })}
        //   </tbody>
        // </table> */}


        {/* <Modal isOpen={product.modalInsertar}> */}
        <Modal isOpen={insertar===true}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <form onSubmit={addProduct}>
      <ModalBody>
        <div className="form-group">
          <label>Proveedor: </label>
          <br />
          {/* <input type="text" className="form-control" name="canal" onChange={handleChange}/> */}
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
            // setProduct({modalInsertar: false})
            setInsertar(false)
            }>Cancelar</button>
    </Modal>



    {/* <Modal isOpen={product.modalEditar}>
    <Modal isOpen={editar===true}>
    
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Canal: </label>
          <br />
          <input type="text" className="form-control" name="canal" onChange={(e) => handleInputChange(e)} value={product.form && product.form.canal}/>
          <br />
          <label>País: </label>
          <br />
          <input type="text" className="form-control" name="pais" onChange={(e) => handleInputChange(e)} value={product.form && product.form.pais}/>
          <br />
          <label>Idioma: </label>
          <br />
          <input type="text" className="form-control" name="idioma" onChange={(e) => handleInputChange(e)} value={product.form && product.form.idioma}/>
          <input type="text" name="idioma"/>
          <br />
          <label>Cantidad de Suscriptores (millones): </label>
          <br />
          <input type="text" className="form-control" name="suscriptores" onChange={(e) => handleInputChange(e)} value={product.form && product.form.suscriptores}/>
          <input type="text" name="suscriptores"/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>
            // setProduct({modalEditar: false})
            setEditar(false)
            }>Cancelar</button>
      </ModalFooter>
    </Modal> */}
      </div>
      </>
    );
};

export default Inventario;