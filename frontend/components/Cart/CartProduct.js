import React, { useRef, useState, useContext, Fragment } from 'react'


import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../store/auth';

import styles from './CartProduct.module.css';

import Image from 'next/image';
import StatusOverlay from '../Common/UX/StatusOverlay';
import LoadingSpinner from '../Common/UX/LoadingSpinner';

function CartProduct(props) {

  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { id, name, image, price, quantityP, color, size } = props;

  const [quantity, setQuantity] = useState(quantityP);
  const quantityRef = useRef();

  const productIncrementHandler = async () => {
    setQuantity(prev => { return prev + 1 })
    const productId = id;
    const selColor = color;
    const selSize = size;
    const ProductQuan = quantity
    try {
      await sendRequest('/user/cart', 'POST', JSON.stringify({
        proId: productId,
        proColor: selColor,
        proSize: selSize,
        proQuan: 1,
        action: "PLUS"
      }),
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${AuthCtx.token}`
        }
      )

    } catch (err) {

    }
    props.onRefresh()
  }
  const productDecrementHandler = async () => {
    if (quantity === 1) {
      return 0
    }
    setQuantity(prev => prev - 1)
    const productId = id;
    const selColor = color;
    const selSize = size;
    const ProductQuan = 1
    try {
      await sendRequest('/user/cart', 'POST', JSON.stringify({
        proId: productId,
        proColor: selColor,
        proSize: selSize,
        proQuan: ProductQuan,
        action: "MINUS"
      }),
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${AuthCtx.token}`
        }
      )

    } catch (err) {

    }
    props.onRefresh()
  }
  const deleteHandler = async () => {
    const productId = id;
    const selColor = color;
    const selSize = size;
    const ProductQuan = 1
    try {
      await sendRequest('/user/cart', 'POST', JSON.stringify({
        proId: productId,
        proColor: selColor,
        proSize: selSize,
        proQuan: ProductQuan,
        action: "REMOVE"
      }),
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${AuthCtx.token}`
        }
      )

    } catch (err) {

    }
    props.onRefresh()
  }
  const quantityInputHandler = () => {
    if (Number(quantityRef.current.value) <= 0) {
      setQuantity(1)
      return 0;
    }
    setQuantity(Number(quantityRef.current.value))
  }
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay success={false} onClear={clearError} message={error} />}
      <div className={styles.container}>
        <div className={styles.productImage}>
          <Image src={image} width={200} height={200} alt="Cart Product" />
        </div>

        <div className={styles.productInfo}>

          <h2 className={styles.productName}>{name}</h2>

          <div className={styles.productPrice}>
            <div className={styles.subHead}>
              Price
            </div>
            <div>{`$${price}`}</div>
          </div>

          <div className={styles.quantity}>
            <div className={styles.subHead}>
              Quantity
            </div>
            <div className={styles.quantityControls}>
              <button onClick={productDecrementHandler} ><i className="fa-solid fa-minus"></i></button>
              <input disabled onChange={quantityInputHandler} ref={quantityRef} type="number" value={quantity} min="1"></input>
              <button onClick={productIncrementHandler}><i className="fa-solid fa-plus"></i></button>
            </div>
          </div>

          <div className={styles.colorSize}>
            <div className={styles.colorSize_color}>
              <div className={styles.subHead}>
                Color
              </div>
              <div style={{ backgroundColor: `${color}`, width: '40px', height: '20px' }} ></div>
            </div>
            <div className={styles.colorSize_size}>
              <div className={styles.subHead}>
                Size
              </div>
              <div>{`${size}`}</div>
            </div>
          </div>

          <div className={styles.Dbutton}>
            <button onClick={deleteHandler}><i className="fa-solid fa-trash"></i></button>
          </div>

        </div>
      </div >
    </Fragment>
  )
}

export default CartProduct