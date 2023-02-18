import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../components/Common/UX/StatusOverlay';

import { useRouter } from 'next/router';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../store/auth';
import styles from '../../styles/users/trackOrder.module.css';


function TrackOrder() {

  const AuthCtx = useContext(AuthContext);
  const router = useRouter();
  const [willReachIn, setWillReachIn] = useState("");
  const [status, setStatus] = useState("");
  const trackOrderRef = useRef();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (!AuthCtx.isLoggedIn) {
      router.push('/login');
    }
  }, [AuthCtx, router])

  const submitHandler = async (event) => {
    event.preventDefault();
    const orderId = trackOrderRef.current.value;
    try {
      const data = await sendRequest(`/user/trackOrder/${orderId}`, 'GET', null, {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${AuthCtx.token}`
      });
      setStatus(data.order.status);
      setWillReachIn(data.order.willReachIn);
    } catch (err) { }
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay message={error} success={false} onClear={clearError} />}

      <div className={`container ${styles.container}`}>
        <h2 className={styles.heading}>Track Your Order</h2>
        <div className={styles.trackOrderForm}>
          <form onSubmit={submitHandler}>
            <input ref={trackOrderRef} type="text" required placeholder='Enter Order ID' />
            <button>Track</button>
          </form>
        </div>
        <div className={styles.status}>
          <div>
            Your Order will reach in <span>{willReachIn}</span>
          </div>
          <div>
            Status <span>{status}</span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TrackOrder