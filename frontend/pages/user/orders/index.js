const DUMMY_DATA = [
    {
        id: "232323",
        date: new Date(),
        price: 500,
        status: "Payment Pending"
    },
    {
        id: "232352",
        date: new Date(),
        price: 300,
        status: "Order Completed"
    },
    {
        id: "2322353",
        date: new Date(),
        price: 500,
        status: "Payment Pending"
    },
    {
        id: "23242352",
        date: new Date(),
        price: 300,
        status: "Order Completed"
    }
]

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import Table from '../../../components/Orders/Table'
import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import styles from '../../../styles/users/orders/orders.module.css';



function Orders() {

    const AuthCtx = useContext(AuthContext);
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        if (!AuthCtx.isLoggedIn) {
            router.push('/login');
        }
    }, [AuthCtx, router])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await sendRequest('/user/orders', 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setOrders(data.orders);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest])

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`container ${styles.container}`}>
                <div>
                    <h2>Orders</h2>
                </div>
                <Table data={orders} />
                <p>Contact If You Want to Cancel (orders@iwaleather.com) with your Order ID And Email</p>
            </div>
        </Fragment>
    )
}

export default Orders