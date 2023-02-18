

import React from 'react'
import ProductCard from '../Common/Product/ProductCard';

import styles from './TopProducts.module.css'

function TopProducts(props) {
    const { products } = props;
    return (
        <div className={`${styles.container} container`}>
            <div className={styles.heading}>
                <h2>Top Products</h2>
            </div>
            <div className={styles.products}>

                {products.map((data) => {
                    return <ProductCard
                        key={data._id}
                        id={data._id}
                        image={data.images[0].url}
                        alt={data.images[0].alt}
                        name={data.name}
                        link={data.slang}
                        discountedPrice={data.dPrice}
                        price={data.price}
                    />
                })}

            </div>
        </div>
    )
}

export default TopProducts