import "./card.css"
// export function Card({estado}){
//     return(
//         <div className="card">
//             <h1>Mi primer card</h1>
//             <p className={estado?"on":"off"}>Detalle card</p>
//         </div>
//     )
// }
const pokemon=[
    {
        id:1,
        nombre:"pikachu",
        imagen:"https://i.ibb.co/BszMDBT/facce6ffa1e95f3ec5ec5ea68a6721009ad.png"
    },
    {
        id:2,
        nombre:"charizard",
        imagen:"https://i.ibb.co/8YBV3Zb/1200px-Charizard-SSBU.png"
    }
]
export function Card(){
    return pokemon.map((item, index)=>{
        return(
            <div className="card" key={item.id}>
                <h1>{item.nombre}</h1>
                <img className="image" src={item.imagen}/>
            </div>
        );
    });
}