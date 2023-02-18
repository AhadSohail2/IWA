import React from 'react'

import styles from './Products.module.css';
import ProductCard from "../Common/Product/ProductCard"
import Pagination from '../Common/Pagination/pagination';

function Products(props) {
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {props.products.map((data) => {
          return <ProductCard
            id={data._id}
            key={data._id}
            name={data.name}
            image={data.images[0].url}
            alt={data.images[0].alt}
            link={data.slang}
            discountedPrice={data.dPrice}
            price={data.price}
          />
        })}
      </div>
      <div>
        <Pagination totalItems={props.products.length} ItemsPerPage={9} />
      </div>
    </div>
  )
}

export default Products