import React from 'react'
import Table from './Table'

import styles from './OrderProducts.module.css';

function OrderProducts(props) {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>Order Products</div>
            <Table products={props.products} />
        </div>
    )
}

export default OrderProducts