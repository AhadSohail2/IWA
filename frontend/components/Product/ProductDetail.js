import React, { Fragment, useEffect, useState } from 'react'

import styles from './ProductDetail.module.css';

function ProductDetail(props) {
    const { des } = props;
    return (
        <div className={styles.container}>
            <div className={styles.heading}>Product Details</div>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: des }}>
            
            </div>
        </div>
    )
}

export default ProductDetail