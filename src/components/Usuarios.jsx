// function Usuarios(){
// export function Usuarios({nombre, edad}){
//     return(<h1>{nombre}, tiene {edad}</h1>);
// }
export function Usuarios(props){
    console.log(props)
    return(
    <div>
        <h1>{props.nombre}😎</h1>
        <h1>❤{props.edad}</h1>
        <h1>{props.direccion.calle}</h1>
        <h1>{props.direccion.pais}</h1>
    </div>
    )
}
// export default Usuarios;