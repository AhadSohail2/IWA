import React, { useEffect, useContext, Fragment, useState } from 'react'

import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../store/auth';

import OrderSummary from '../../components/Thanks/OrderSummary';

import styles from '../../styles/users/thanks.module.css';
import StatusOverlay from '../../components/Common/UX/StatusOverlay';
import LoadingSpinner from '../../components/Common/UX/LoadingSpinner';
import { useHttpClient } from '../../hooks/http-hook';

function ThanksOrder() {
    const router = useRouter();
    const AuthCtx = useContext(AuthContext);
    const [order, setOrder] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const orderId = router.query["order_id"];

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await sendRequest(`/user/order/${orderId}`, 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setOrder(data.order.products);
            } catch (err) {
            }
        }
        if (orderId) {
            getData();
        }

    }, [orderId, AuthCtx.token, sendRequest])

    console.log(order)

    return (
        <Fragment>

            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2>Thanks For Your Order</h2>
                    <h2>OrderID# {orderId}</h2>
                </div>
                <OrderSummary products={order} />
                <div className={styles.button}>
                    <Link href="/">Go Back</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default ThanksOrder