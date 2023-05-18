import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css"
import {BsFillGridFill} from "react-icons/bs"
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({products}) => {
    const  [grid, setGrid] = useState(true)
    const  [search, setSearch] = useState("")
    const  [sort, setSort] = useState("Reciente")
    const filteredProducts = useSelector(selectFilteredProducts)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(9)
    //Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)


    const  dispatch = useDispatch();

    useEffect(() =>{
        dispatch(SORT_PRODUCTS({products, sort}))
    },[dispatch, products, sort])
    
    useEffect(() =>{
        dispatch(FILTER_BY_SEARCH({products, search}))
    },[dispatch, products, search])

    return (
        <div className={styles["product-list"]} id="product">
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)}/>
                    <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)}/>
                    <p>
                        <b>{filteredProducts.length}</b> Productos
                    </p>
                </div>
                {/* Search Icon */}
                <div>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                {/* Sort Products */}
                <div className={styles.sort}>
                    <label>Sorteados por:</label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="Reciente">Reciente</option>
                        <option value="Precio más bajo">Precio más bajo</option>
                        <option value="Precio más alto">Precio más alto</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                </div>
            </div>

            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                {products.length === 0 ? (
                    <p>No se encontraron productos.</p>
                ) : (
                    <>
                        {currentProducts.map((product) =>{
                            return (
                                <div key={product.id}>
                                    <ProductItem {...product} grid={grid} product={product}/>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
            <Pagination
             currentPage={currentPage}
             setCurrentPage={setCurrentPage}
             productsPerPage={productsPerPage}
             totalProducts={filteredProducts.length}
            />
        </div>)
}

export default ProductList