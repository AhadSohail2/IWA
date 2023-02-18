import React, { Fragment, useContext, useEffect, useState } from 'react'

import Link from 'next/link';
import { useRouter } from 'next/router';

import OrderProducts from '../../../components/DetailOrder/OrderProducts';
import OrderSummary from '../../../components/DetailOrder/OrderSummary';

import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

import styles from '../../../styles/users/orders/detailedOrder.module.css'

function DetailedOrder() {

    const AuthCtx = useContext(AuthContext);
    const router = useRouter();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [order, setOrder] = useState([]);
    const [statusW, setStatus] = useState("");

    const orderID = router.query.orderId;

    useEffect(() => {
        if (!AuthCtx.isLoggedIn) {
            router.push('/login');
        }
    }, [AuthCtx, router])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await sendRequest(`/user/order/${orderID}`, 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setStatus(data.order.status)
                setOrder(data.order.products);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest, orderID])

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`container ${styles.container}`}>
                <div className={styles.orderID}>
                    Order ID
                    <span>{orderID}</span>
                </div>
                <div className={styles.ProductsSummary}>
                    <OrderSummary products={order} />
                    <OrderProducts products={order} />
                </div>
                <div className={styles.goBack}>
                    <Link href="/user/orders">GO Back</Link>
                    {(statusW === "Payment Pending") && <Link href={`/user/checkout/${orderID}`}>Make Payment</Link>}
                </div>
            </div>
        </Fragment>
    )
}

export default DetailedOrder