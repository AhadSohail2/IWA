import React from 'react';
import CartProduct from './CartProduct';

import styles from './CartProducts.module.css';

function CartProducts(props) {
    const { products } = props;
    return (
        <div className={styles.container}>
            {products.map((data) => {
                return <CartProduct
                    onRefresh={props.onRefresh}
                    key={data._id._id}
                    id={data._id._id}
                    name={data._id.name}
                    image={data._id.images[0].url}
                    price={data._id.dPrice}
                    quantityP={data.quantity}
                    size={data.selectedSize}
                    color={data.selectedColor}
                />
            })}
        </div>
    )
}

export default CartProducts