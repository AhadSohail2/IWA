import React from 'react'
import ProductCard from '../Common/Product/ProductCard';

import styles from './RelatedProducts.module.css';

function RelatedProducts(props) {
  const { products } = props;
  return (
    <div className={styles.productContainer}>
      <h2>Related Products</h2>
      <div className={styles.products}>
        {products.map((data) => {
          return <ProductCard
            key={data._id}
            id={data._id}
            image={data.image}
            alt={data.alt}
            name={data.name}
            link={data.link}
            discountedPrice={data.discountedPrice}
            price={data.price}
          />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts