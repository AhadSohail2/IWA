import React from 'react'
import WishProduct from './WishProduct';

import styles from './WishProducts.module.css';

function WishProducts(props) {

    const { products } = props;

    return (
        <div className={styles.container}>
            {products.map((data) => {
                return <WishProduct
                    key={data._id._id}
                    id={data._id._id}
                    image={data._id.images[0].url}
                    price={data._id.dPrice}
                    name={data._id.name}
                    slang={data._id.slang}
                    onClick={props.onClick}
                />
            })}
        </div>
    )
}

export default WishProducts