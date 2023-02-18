import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../../../styles/products/Search.module.css'

import SideNav from '../../../components/Search/SideNav';
import Products from '../../../components/Search/Products';


function ProductSearch(props) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let filteredProducts = props.Products.filter((data) => {
      return data.dPrice <= 200
    })
    filteredProducts = filteredProducts.filter((data) => {
      return data.dPrice >= 0
    })
    setProducts(filteredProducts);
  }, [props.Products])

  const filterHandler = (value) => {
    let filteredProducts = props.Products.filter((data) => {
      return data.dPrice <= value;
    })
    setProducts(filteredProducts);
  }

  const router = useRouter();
  let searchQuery = "";


  if (router.isReady) {
    searchQuery = router.query.SearchQuery;
  }

  const formatedSearchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

  return (
    <div className={`${styles.container}`}>
      <h2 className={styles.heading}>{formatedSearchQuery}</h2>
      <div className={`${styles.subContainer} container `}>
        <SideNav onClick={filterHandler} />
        {products.length === 0 ? <p className={styles.nothingFound}>No Products Found</p> : <Products products={products} />}
      </div>
    </div>
  )
}

export default ProductSearch

export async function getServerSideProps(context) {

  let params = context.params.SearchQuery;

  try {
    const res = await fetch(`${process.env.BACKEND}/products/${params}`);
    const data = await res.json();
    const res1 = await fetch(`${process.env.BACKEND}/category/${params}`);
    const data1 = await res1.json();
    if (!res.ok || !res1.ok) {
      const err = new Error(data.message);
      throw err;
    } else {
      return {
        props: {
          Products: [...data.data, ...data1.data],
        }
      }
    }

  } catch (err) {
    return {
      redirect: {
        destination: "/wentWrong"
      }
    }
  }
}