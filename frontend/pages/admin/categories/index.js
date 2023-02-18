import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router';
import { AuthContext } from '../../../store/auth';
import { useHttpClient } from '../../../hooks/http-hook';

import styles from '../../../styles/admin/categories/Categories.module.css';
import Table from '../../../components/admin/categories/Table';
import LoadingSpinner from '../../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../../components/Common/UX/StatusOverlay';

function AdminCategory() {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const newCategoryRef = useRef();
    const preCategoryRef = useRef();

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({ id: null, name: null });
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
                const data = await sendRequest('/admin/categories', 'GET', null, {
                    'authorization': `Bearer ${AuthCtx.token}`
                })
                setData(data.categories);
            } catch (err) { }
        }
        getData();
    }, [AuthCtx, sendRequest, refresh])

    const addCategoryHandler = async (event) => {
        event.preventDefault();
        const name = newCategoryRef.current.value;
        try {
            await sendRequest('/admin/category', 'POST', JSON.stringify({ categoryName: name }), {
                'Content-Type': "application/json",
                'authorization': `Bearer ${AuthCtx.token}`
            })
            setRefresh(prev => !prev)
        } catch (err) {

        }
    }

    const updateCategoryHandler = async (event) => {
        event.preventDefault();
        const id = editData.id;
        const name = preCategoryRef.current.value;
        try {
            await sendRequest('/admin/category', 'PUT', JSON.stringify({ categoryName: name, id: id }), {
                'Content-Type': "application/json",
                'authorization': `Bearer ${AuthCtx.token}`
            })
            setEditData({ name: null, id: null });
            setRefresh(prev => !prev)
        } catch (err) {

        }
    }

    const editHandler = (data) => {
        setEditData(data);
    }

    const deleteHandler = async (id) => {
        try {
            await sendRequest(`/admin/category/${id}`, 'DELETE', null, {
                'authorization': `Bearer ${AuthCtx.token}`
            })
            setRefresh(prev => !prev)
        } catch (err) {

        }
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
            <div className={`${styles.container} container`}>
                <div className={styles.mainHeading}>
                    <h2>Categories</h2>
                </div>
                <div className={styles.addCategories}>
                    <form onSubmit={addCategoryHandler}>
                        <input ref={newCategoryRef} type="text" required placeholder="Enter Category Name" />
                        <button>Submit</button>
                    </form>
                </div>
                <div className={styles.UpdateCategories}>
                    <form onSubmit={updateCategoryHandler}>
                        <input defaultValue={editData.name} ref={preCategoryRef} type="text" required placeholder="Update Category Name" />
                        <button>Update</button>
                    </form>
                </div>
                <div className={styles.table}>
                    <Table data={data} onEditClick={editHandler} onDeleteClick={deleteHandler} />
                </div>
            </div>
        </Fragment>
    )
}

export default AdminCategory;