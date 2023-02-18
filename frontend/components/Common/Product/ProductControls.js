import Link from 'next/link'
import React from 'react'

import styles from './ProductControls.module.css'
function ProductControls(props) {

    const CartHandler = () => {
        props.onClickCartHandler(props.id)
    }

    return (
        <div className={styles.productControls}>
            <button onClick={CartHandler}>Add To Cart</button>
            <Link href={`/products/${props.link}`}>View</Link>
        </div>
    )
}

export default ProductControls