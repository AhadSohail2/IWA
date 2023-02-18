import React, { Fragment, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router';
import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import styles from '../../../styles/admin/query/AdminQuery.module.css';
import Table from '../../../components/admin/query/Table';
import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

function AdminUsers() {

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
                const data = await sendRequest('/admin/query', 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setData(data.query);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest, refresh])

    const deleteHandler = async (id) => {
        try {
            await sendRequest(`/admin/query/${id}`, 'DELETE', null, {
                'authorization': `Bearer ${AuthCtx.token}`
            })
            setRefresh(prev => !prev)
        } catch (err) { }
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`${styles.container} container`}>
                <div className={styles.mainHeading}>
                    <h2>Query</h2>
                </div>
                <div className={styles.table}>
                    <Table onDeleteClick={deleteHandler} data={data} />
                </div>
            </div>
        </Fragment>
    )
}

export default AdminUsers