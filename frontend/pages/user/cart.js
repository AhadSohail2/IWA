import React, { Fragment, useContext, useEffect, useState } from 'react'

import styles from '../../styles/users/cart.module.css';

import CartProducts from '../../components/Cart/CartProducts'
import OrderSummary from '../../components/Cart/OrderSummary'

import { AuthContext } from '../../store/auth';
import { useRouter } from 'next/router';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../components/Common/UX/StatusOverlay';

function CartPage() {
  const AuthCtx = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!AuthCtx.isLoggedIn) {
      router.push('/login');
    }
  }, [AuthCtx, router])

  const refreshHandler = () => {
    setRefresh(prev => !prev)
  }
  const orderHandler = async () => {
    const data = await sendRequest('/user/order', 'POST', {}, {
      'authorization': `Bearer ${AuthCtx.token}`
    })
    const orderID = data.orderId;
    router.push(`/user/checkout/${orderID}`)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await sendRequest('/user/cart', 'GET', null, {
          'authorization': `Bearer ${AuthCtx.token}`
        })
        setCart(data.Cart.products);
      } catch (err) { }
    }
    getData();
  }, [refresh])


  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
      <div className={`container ${styles.container}`}>
        <Fragment>
          <div className={styles.heading}>
            <h2>Cart</h2>
          </div>
          <div className={styles.mainElements}>
            {cart.length === 0 ? <p className={styles.nothingFound}>Add Some products</p> :
              <Fragment><CartProducts onRefresh={refreshHandler} products={cart} /> <OrderSummary products={cart} /></Fragment>
            }
          </div>
          <button onClick={orderHandler} disabled={cart.length === 0} className={styles.orderNow}>Order Now</button>
        </Fragment>
      </div>
    </Fragment>
  )
}

export default CartPage