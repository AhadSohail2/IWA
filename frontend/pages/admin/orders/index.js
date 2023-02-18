import React, { Fragment, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router';
import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import styles from '../../../styles/admin/orders/AdminOrders.module.css';
import Table from '../../../components/admin/orders/Table';
import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

function AdminOrder() {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [data, setData] = useState([]);

    const AuthCtx = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!AuthCtx.isLoggedIn) {
            if (AuthCtx.userRole != "Admin") {
                router.push('/login');
            }
        }
    }, [AuthCtx, router])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await sendRequest('/admin/orders', 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setData(data.orders);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest])

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`${styles.container} container`}>
                <div className={styles.mainHeading}>
                    <h2>Orders</h2>
                </div>
                <div className={styles.table}>
                    <Table data={data} />
                </div>
            </div>
        </Fragment>
    )
}

export default AdminOrder