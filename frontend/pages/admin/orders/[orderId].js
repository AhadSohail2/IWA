import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link';

import { useRouter } from 'next/router';
import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import styles from '../../../styles/admin/orders/AdminDetailedOrder.module.css';
import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';
import OrderSummary from '../../../components/admin/detailOrder/OrderSummary';
import OrderProducts from '../../../components/admin/detailOrder/OrderProducts';

function AdminDetailedOrder() {

    const AuthCtx = useContext(AuthContext);
    const router = useRouter();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [order, setOrder] = useState([]);
    const [orderInfo, setOrderInfo] = useState();
    const [message, setMessage] = useState();
    const statusRef = useRef();
    const willReachRef = useRef();

    const orderID = router.query.orderId;

    useEffect(() => {
        if (!AuthCtx.isLoggedIn && AuthCtx.userRole != "Admin") {
            router.push('/login');
        }
    }, [AuthCtx, router])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await sendRequest(`/admin/order/${orderID}`, 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setOrderInfo(data.order);
                setOrder(data.order.products);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest, orderID])

    const submitHandler = async (event) => {
        event.preventDefault();
        const status = statusRef.current.value;
        const willReach = willReachRef.current.value;
        try {
            const data = await sendRequest(`/admin/order/${orderID}`, 'PUT',
                JSON.stringify({ status: status, willReachIn: willReach })
                , {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthCtx.token}`
                })
            setMessage(data.message);
        } catch (err) {

        }
    }

    const deleteHandler = async (event) => {
        event.preventDefault();
        try {
            const data = await sendRequest(`/admin/order/${orderID}`, 'DELETE',
                null
                , {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AuthCtx.token}`
                })
            setMessage(data.message);
            router.push("/admin/orders")
        } catch (err) {

        }
    }

    const clearMessage = () => {
        setMessage(null);
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            {message && <StatusOverlay message={message} success={true} onClear={clearMessage} />}
            <div className={`container ${styles.container}`}>
                <div className={styles.orderID}>
                    Order ID
                    <span>{orderID}</span>
                </div>
                {orderInfo &&
                    <div className={styles.userInfo}>
                        <div className={styles.userInfo_SubContainer}>
                            <div className={styles.sub_sub_container}>
                                <div className={styles.userHead}>Name</div>
                                <div className={styles.userInfo_Line}>{orderInfo.userID.name}</div>
                            </div>
                            <div className={styles.sub_sub_container}>
                                <div className={styles.userHead}>Email</div>
                                <div className={styles.userInfo_Line}>{orderInfo.userID._id}</div>
                            </div>
                            <div className={styles.sub_sub_container}>
                                <div className={styles.userHead}>Phone No</div>
                                <div className={styles.userInfo_Line}>{orderInfo.userID.phoneNo}</div>
                            </div>
                        </div>
                        <div className={styles.userInfo_SubContainer}>
                            <div className={styles.sub_sub_container}>
                                <div className={styles.userHead}>Whatsapp No</div>
                                <div className={styles.userInfo_Line}>{orderInfo.userID.WhatsNo}</div>
                            </div>
                            <div className={styles.sub_sub_container}>
                                <div className={styles.userHead}>Address</div>
                                <div className={styles.userInfo_Line}>{orderInfo.userID.address}</div>
                            </div>
                        </div>
                    </div>
                }
                <div className={styles.ProductsSummary}>
                    <OrderSummary products={order} />
                    <OrderProducts products={order} />
                </div>
                <div className={styles.updateStatus}>
                    {orderInfo &&
                        <form onSubmit={submitHandler}>
                            <input ref={statusRef} defaultValue={orderInfo.status} type="text" placeholder="Enter Status" required />
                            <input ref={willReachRef} defaultValue={orderInfo.willReachIn} type="text" placeholder="Will Reach In" required />
                            <button>Submit</button>
                        </form>
                    }
                </div>
                <div className={styles.goBack}>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
                <div className={styles.goBack}>
                    <Link href="/admin/orders">GO Back</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminDetailedOrder
