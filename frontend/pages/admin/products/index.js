import React, { Fragment, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router';
import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import styles from '../../../styles/admin/products/AdminProducts.module.css';
import Table from '../../../components/admin/product/Table';
import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

function AdminProducts() {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

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
                const data = await sendRequest('/admin/products', 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                console.log(data.products);
                setData(data.products);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest, refresh])

    const addHandler = (event) => {
        event.preventDefault();
        router.push('/admin/products/new')
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`${styles.container} container`}>
                <div className={styles.mainHeading}>
                    <h2>Products</h2>
                </div>
                <div>
                    <button onClick={addHandler}>Add Product</button>
                </div>
                <div className={styles.table}>
                    <Table data={data} />
                </div>
            </div>
        </Fragment>
    )
}

export default AdminProducts;