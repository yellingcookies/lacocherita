//function Coffe(){
export function Coffe(){
    // const caliente=true;
    // return (<h1>{caliente?"cafe caliente":"cafe frio"}</h1>)
    const datos={
        nombre: "frank", 
        edad: 20
    }
    return (<div>
        <h1>{datos.nombre}</h1>
        <h1>{datos.edad}</h1>
    </div>)
}
//export default Coffe;