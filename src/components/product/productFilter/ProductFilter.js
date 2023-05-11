import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from "../../../redux/slice/filterSlice";
import { selectMaxPrice, selectMinPrice, selectProducts } from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.css"
const ProductFilter = () => {
    const [category, setCategory] = useState("Todos")
    const [brand, setBrand] = useState("Todos")
    const [price, setPrice] = useState(1000)
    const products = useSelector(selectProducts)
    const minPrice = useSelector(selectMinPrice)
    const maxPrice = useSelector(selectMaxPrice)


    const dispatch = useDispatch()

    const allCategories = [
        "Todos",
        ...new Set(products.map((products) => products.category))
    ]
    const allBrands = [
        "Todos",
        ...new Set(products.map((products) => products.brand))
    ]

    useEffect(() => {
        dispatch(FILTER_BY_BRAND({products, brand}))
    }, [dispatch, products, brand ])

    useEffect(() => {
        dispatch(FILTER_BY_PRICE({products, price}))
    }, [dispatch, products, price])

    const filterProducts = (cat) => {
        setCategory(cat)
        dispatch(FILTER_BY_CATEGORY({products, category: cat}))
    };

    const clearFilters = () => {
        setCategory("Todos")
        setBrand("Todos")
        setPrice(maxPrice)
    }

    return <div className={styles.filter}>
        <h4>Categorias</h4>
        <div className={styles.category}>
            {allCategories.map((cat, index) => {
                return (
                    <button key={index} type="button" className={`${category}` === cat ? `${styles.active}` : null}
                    onClick={() => filterProducts(cat)}
                    >&#8250; {cat}</button>
                )
            })}
        </div>
        <h4>Horario</h4>
        <div className={styles.brand}>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                {allBrands.map((brand, index) =>{
                    return (
                        <option key={index} value={brand}>{brand}</option>
                    )
                })}
            </select>
            <h4>Precio</h4>
            <p>{`$${price}`}</p>
            <div className={styles.price}>
                <input type="range" value={price} onChange={(e) => setPrice(e.target.value)} min={minPrice} max={maxPrice}/>
            </div>
            <br/>
            <button className="--btn --btn-danger" onClick={clearFilters}>Borrar Filtros</button>
        </div>
        </div>
}

export default ProductFilter