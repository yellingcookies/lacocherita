import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";


const useFetchDocument = (collectionName, documentID) => {
    const [document, setDocument] = useState(null)

    const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID);
        const docSnap =  await getDoc(docRef);

        if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const obj = {
            id: documentID,
            ...docSnap.data()
        }
        setDocument(obj)

        } else {
            toast.error("Documento no encontrado");
        } 
    };

    useEffect(() => {
        getDocument()
    }, [])

    return { document }
}

export default useFetchDocument