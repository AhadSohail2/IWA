import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import styles from './WishProduct.module.css';

function WishProduct(props) {

    const { id, name, image, price, slang } = props;

    const trashHandler = () => {
        props.onClick(id);
    }

    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                <Image src={image} width={140} height={140} alt="WishList Product" />
            </div>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{name}</h3>
                <div className={styles.productPrice}>{`$${price}`}</div>
                <div className={styles.productControls}>
                    <button onClick={trashHandler} ><i className="fa-solid fa-trash"></i></button>
                    <Link href={`/products/${slang}`} >View</Link>
                </div>
            </div>
        </div>
    )
}

export default WishProduct