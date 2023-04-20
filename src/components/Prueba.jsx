import { useState } from "react";
import { useEffect } from "react";

export function Prueba(){
const [likes, setLikes] = useState(0);
const [tema, setTemas] = useState(false);
const cambiartema=()=>{
   setTemas(true);
   console.log(tema);
}
const darLike=()=>{
   setLikes(likes + 1);
}
const quitarLike=()=>{
   setLikes(likes - 1);
}

useEffect(darLike,[])
   return(
      <div>
         <h1>Likes {likes}</h1>
         {/* <button 
            onClick={()=>{
               setLikes(likes+1)
            }}
         >
            Dar likes
         </button> */}
         <button 
            onClick={darLike}
         >
            Dar likes
         </button>
         <button 
            onClick={quitarLike}
         >
            Quitar like
         </button>
         <button 
            onClick={cambiartema}
         >
            Tema
         </button>
      </div>
   );
}