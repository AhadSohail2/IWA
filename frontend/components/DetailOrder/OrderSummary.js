import React from 'react'

import styles from './OrderSummary.module.css'

function OrderSummary(props) {
  const products = props.products;
  const Delivery = 10;


  let totalItems = 0;
  let total = 0;

  products.map((data) => {
    totalItems += data.quantity;
    total += data.quantity * data._id.dPrice
  })

  let totalBill = total + Delivery;


  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Summary</h3>
      </div>
      <div className={`${styles.subTotalItems} ${styles.summaryelement}`}>
        <div>{`Subtotal Items(${totalItems})`}</div>
        <div>{`$${total}`}</div>
      </div>
      <div className={`${styles.deliveryCharges} ${styles.summaryelement}`}>
        <div>Delivery Charges</div>
        <div>{`$${Delivery}`}</div>
      </div>
      <div className={`${styles.totalBill} ${styles.summaryelement}`}>
        <div>Total Bill</div>
        <div>{`$${totalBill}`}</div>
      </div>
    </div>
  )
}

export default OrderSummary